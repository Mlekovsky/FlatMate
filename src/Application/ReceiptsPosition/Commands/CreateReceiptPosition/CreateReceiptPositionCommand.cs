using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Application.TodoLists.Queries.GetTodos;
using FlatMate_backend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.ReceiptsPosition.Commands.CreateReceiptPosition
{
    public class CreateReceiptPositionCommand : BaseRequest, IRequest<Result<int>>
    {
        public int ReceiptId { get; set; }
        public int ApartamentId { get; set; }
        public double Value { get; set; }
        public string Product { get; set; }
        public List<int> AssignedUsersId { get; set; }
    }

    public class CreateReceiptPositionCommandHandler : IRequestHandler<CreateReceiptPositionCommand, Result<int>>
    {
        private readonly IApplicationDbContext _context;

        public CreateReceiptPositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<int>> Handle(CreateReceiptPositionCommand request, CancellationToken cancellationToken)
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

            var receipt = await _context.Receipt.FirstOrDefaultAsync(x => x.Id == request.ReceiptId);

            if (receipt == null)
            {
                return new Result<int>(false, new List<string> { "Receipt does not exists" });
            }

            var entity = new ReceiptPosition();

            entity.Created = DateTime.Now;
            entity.CreatedBy = user.Id.ToString();

            entity.Product = request.Product;
            entity.Value = request.Value;

            entity.Receipt = receipt;

            await _context.ReceiptPosition.AddAsync(entity);

            //Zapisujemy pozycje żeby mieć ID
            await _context.SaveChangesAsync(cancellationToken);

            entity.UserReceiptPositions = new List<UserReceiptPosition>();

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

            return new Result<int>(true, entity.Id);
        }
    }

}
