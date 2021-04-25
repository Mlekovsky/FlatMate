using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
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

            var receipts = await _context.Receipts
                .Include(x => x.Apartament)
                .Where(x => x.Apartament.Id == request.ApartamentId && x.IsDeleted == false)
                .ToListAsync();

            switch (request.Filter)
            {
                case ReceiptFilterMode.NotPaid:
                    break;
                case ReceiptFilterMode.Paid:
                    break;
                case ReceiptFilterMode.All:
                    break;
                default:
                    break;
            }


            throw new NotImplementedException();
        }
    }


}
