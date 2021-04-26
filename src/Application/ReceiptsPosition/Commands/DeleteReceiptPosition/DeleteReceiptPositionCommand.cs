using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.ReceiptsPosition.Commands.DeleteReceiptPosition
{
    public class DeleteReceiptPositionCommand: BaseRequest, IRequest<Result<bool>>
    {
        public int Id { get; set; }
        public int ApartamentId { get; set; }
    }

    public class DeleteReceiptPositionCommandHandler : IRequestHandler<DeleteReceiptPositionCommand, Result<bool>>
    {
        private readonly IApplicationDbContext _context;
        public DeleteReceiptPositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<bool>> Handle(DeleteReceiptPositionCommand request, CancellationToken cancellationToken)
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

            var entity = await _context.ReceiptPosition.FirstOrDefaultAsync(x => x.Id == request.Id);

            _context.ReceiptPosition.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return new Result<bool>(true, true);
        }
    }
}
