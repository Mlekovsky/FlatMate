﻿using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Application.TodoLists.Queries.GetTodos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Receipts.Queries
{
    public class GetReceiptsQuery : BaseRequest, IRequest<Result<ReceiptsDTO>>
    {
        public int ApartamentId { get; set; }
        public ReceiptFilterMode Filter { get; set; }
    }


    public class GetReceiptsQueryHandler : IRequestHandler<GetReceiptsQuery, Result<ReceiptsDTO>>
    {

        private readonly IApplicationDbContext _context;

        public GetReceiptsQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<ReceiptsDTO>> Handle(GetReceiptsQuery request, CancellationToken cancellationToken)
        {
            var apartamentDb = await _context.Apartaments
             .Include(x => x.UserApartaments)
             .Include(x => x.ApartamentModules)
             .FirstOrDefaultAsync(x => x.Id == request.ApartamentId && x.IsDeleted == false);

            var userId = request.GetUser();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId && x.IsDeleted == false);

            if (apartamentDb == null)
            {
                return new Result<ReceiptsDTO>(false, new List<string> { $"Cannot find any apratament with id {request.ApartamentId}" });
            }

            if (user == null)
            {
                return new Result<ReceiptsDTO>(false, new List<string> { "User does not exist in system" });
            }

            var receipts = await _context.Receipt
                .Include(x => x.Apartament)
                .Where(x => x.Apartament.Id == request.ApartamentId && x.IsDeleted == false)
                .ToListAsync();

            switch (request.Filter)
            {
                case ReceiptFilterMode.NotPaid:
                    receipts = receipts.Where(x => x.Paid == false).ToList();
                    break;
                case ReceiptFilterMode.Paid:
                    receipts = receipts.Where(x => x.Paid == true).ToList();
                    break;
                case ReceiptFilterMode.All:
                default:
                    break;
            }

            ReceiptsDTO result = new ReceiptsDTO();

            var currentApartamentUsersIds = await _context.UserApartaments
              .Include(x => x.User)
              .Where(x => x.ApartamentId == request.ApartamentId && x.User.IsDeleted == false)
              .Select(x => x.UserId).ToListAsync();

            var assignableUsers = await _context.Users
                .Where(x => currentApartamentUsersIds.Contains(x.Id))
                .Select(x => new AssignableUsersDTO { User = string.Concat(x.FirstName, " ", x.LastName), UserId = x.Id })
                .ToListAsync();

            result.Users = assignableUsers;

            List<ReceiptListDTO> resultsRecepies = new List<ReceiptListDTO>();
            foreach (var receipt in receipts)
            {
                List<ReceiptPositionDTO> positionsToAdd = new List<ReceiptPositionDTO>();

                var receiptToAdd = new ReceiptListDTO
                {
                    Id = receipt.Id,
                    Date = receipt.Date,
                    Paid = receipt.Paid,
                    Title = receipt.Title,
                };

                var receiptsPositions = _context.ReceiptPosition.Include(x => x.Receipt).Where(x => x.Receipt.Id == receipt.Id);

                foreach (var position in receiptsPositions)
                {
                    positionsToAdd.Add(new ReceiptPositionDTO
                    {
                        Id = position.Id,
                        Product = position.Product,
                        ReceiptId = receipt.Id,
                        Value = position.Value,
                        AssignedUsers = await _context.UserReceiptPosition
                        .Include(x => x.User)
                        .Where(x => x.ReceiptPositionId == position.Id)
                        .Select(x => new AssignableUsersDTO { User = string.Concat(x.User.FirstName, " ", x.User.LastName), UserId = x.User.Id }).ToListAsync()
                    });
                }

                //TODO: DOKOŃCZYĆ TO
                var distinctUsers = positionsToAdd.Select(x => x.AssignedUsers).Distinct();

                receiptToAdd.TotalValue = positionsToAdd.Sum(x => x.Value);
                resultsRecepies.Add(receiptToAdd);
            }

            return new Result<ReceiptsDTO>(true, result);
        }
    }


}