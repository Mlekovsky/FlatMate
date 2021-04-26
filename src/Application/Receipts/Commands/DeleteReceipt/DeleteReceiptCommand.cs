using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Receipts.Commands.DeleteReceipt
{
    public class DeleteReceiptCommand : BaseRequest, IRequest<Result<bool>>
    {
        public int ApartamentId { get; set; }
        public int ReceiptId { get; set; }
    }

    public class DeleteReceiptCommandHandler : IRequestHandler<DeleteReceiptCommand, Result<bool>>
    {
        private readonly IApplicationDbContext _context;

        public DeleteReceiptCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<bool>> Handle(DeleteReceiptCommand request, CancellationToken cancellationToken)
        {
            var apartamentDb = await _context.Apartaments
              .Include(x => x.UserApartaments)
              .Include(x => x.ApartamentModules)
              .FirstOrDefaultAsync(x => x.Id == request.ApartamentId);

            var userId = request.GetUser();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (apartamentDb == null)
            {
                return new Result<bool>(false, new List<string> { $"Cannot find any apratament with id {request.ApartamentId}" });
            }

            if (user == null)
            {
                return new Result<bool>(false, new List<string> { "User does not exist in system" });
            }

            var entity = await _context.Receipt.FirstOrDefaultAsync(x => x.Id == request.ReceiptId);

            _context.Receipt.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return new Result<bool>(true, true);
        }
    }
}
