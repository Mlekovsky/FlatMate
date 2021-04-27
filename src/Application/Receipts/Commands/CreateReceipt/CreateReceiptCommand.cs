using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Receipts.Commands.CreateReceipt
{
    public class CreateReceiptCommand : BaseRequest, IRequest<Result<int>>
    {
        public int ApartamentId { get; set; }
        public int PaidBy { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
    }

    public class CreateReceiptCommandHandler : IRequestHandler<CreateReceiptCommand, Result<int>>
    {
        private readonly IApplicationDbContext _context;
        public CreateReceiptCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<int>> Handle(CreateReceiptCommand request, CancellationToken cancellationToken)
        {
            var apartamentDb = await _context.Apartaments
                .Include(x => x.UserApartaments)
                .Include(x => x.ApartamentModules)
                .FirstOrDefaultAsync(x => x.Id == request.ApartamentId);

            var userId = request.GetUser();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (apartamentDb == null)
            {
                return new Result<int>(false, new List<string> { $"Cannot find any apratament with id {request.ApartamentId}" });
            }

            if (user == null)
            {
                return new Result<int>(false, new List<string> { "User does not exist in system" });
            }

            try
            {
                var entity = new Receipt();

                entity.Apartament = apartamentDb;
                entity.Created = DateTime.Now;
                entity.CreatedBy = user.Id.ToString();
                entity.Date = request.Date;
                entity.Paid = false;
                entity.PaidBy = await _context.Users.FirstOrDefaultAsync(x => x.Id == request.PaidBy);
                entity.Title = request.Title;

                await _context.Receipt.AddAsync(entity);

                await _context.SaveChangesAsync(cancellationToken);

                return new Result<int>(true, entity.Id);
            }
            catch (Exception ex)
            {
                return new Result<int>(false, new List<string> { ex.Message });
            }
        }
    }

}
