using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.ReceiptsPosition.Commands.UpdateReceiptPosition
{
    public class UpdateReceiptPositionCommand : BaseRequest, IRequest<Result<bool>>
    {
        public int Id { get; set; }
        public int ApartamentId { get; set; }
        public double Value { get; set; }
        public string Product { get; set; }
        public List<int> AssignedUsersId { get; set; }
    }

    public class UpdateReceiptPostionCommandHandler : IRequestHandler<UpdateReceiptPositionCommand, Result<bool>>
    {
        private readonly IApplicationDbContext _context;
        public UpdateReceiptPostionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<bool>> Handle(UpdateReceiptPositionCommand request, CancellationToken cancellationToken)
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

            var entity = await _context.ReceiptPosition.Include(x => x.UserReceiptPositions).FirstOrDefaultAsync(x => x.Id == request.Id);

            if (entity == null)
            {
                return new Result<bool>(false, new List<string> { "Receipt position not found" });
            }

            entity.LastModified = DateTime.Now;
            entity.LastModifiedBy = user.Id.ToString();

            entity.Product = request.Product;
            entity.Value = request.Value;

            if (request?.AssignedUsersId != null && request.AssignedUsersId.Any())
            {
                var assignedUsers = await _context.Users.Where(x => request.AssignedUsersId.Contains(x.Id)).ToListAsync();

                foreach (var assignedUser in assignedUsers)
                {
                    entity.UserReceiptPositions.Add(new UserReceiptPosition
                    {
                        ReceiptPosition = entity,
                        ReceiptPositionId = entity.Id,
                        User = assignedUser,
                        UserId = assignedUser.Id
                    });
                }

                await _context.SaveChangesAsync(cancellationToken);
            }

            return new Result<bool>(true, true);
        }
    }
}
