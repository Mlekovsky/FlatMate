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

namespace FlatMate_backend.Application.Apartaments.Queries.GetApartamentInfo
{
    public class GetApartamentInfoQuery : BaseRequest, IRequest<Result<ApartamentInfoDTO>>
    {
        public int ApartamentId { get; set; }
    }

    public class GetApartamentInfoQueryHandler : IRequestHandler<GetApartamentInfoQuery, Result<ApartamentInfoDTO>>
    {
        private readonly IApplicationDbContext _context;
        public GetApartamentInfoQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<ApartamentInfoDTO>> Handle(GetApartamentInfoQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var apartamentDb = await _context.Apartaments.FirstOrDefaultAsync(x => x.Id == request.ApartamentId);

                if (apartamentDb == null)
                {
                    return new Result<ApartamentInfoDTO>(false, new List<string> { $"No apartament was found for ID: {request.ApartamentId}" });
                }

                var apartamentInfo = new ApartamentInfoDTO
                {
                    Id = apartamentDb.Id,
                    Address = apartamentDb.Address,
                    City = apartamentDb.City,
                    ShortName = apartamentDb.ShortName
                };

                var modules = new List<ModuleDTO>();

                foreach (var module in apartamentDb?.ApartamentModules)
                {
                    modules.Add(new ModuleDTO
                    {
                        Id = module.ModuleId,
                        Name = module.Module.Name
                    });
                }

                apartamentInfo.CurrentModules = modules;

                return new Result<ApartamentInfoDTO>(true, apartamentInfo);
            }
            catch (Exception ex)
            {
                return new Result<ApartamentInfoDTO>(false, new List<string> { ex.Message });
            }
        }
    }

}
