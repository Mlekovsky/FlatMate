using AutoMapper;
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

namespace FlatMate_backend.Application.Apartaments.Queries.GetAvailableApartaments
{
    public class GetAvailableApartamentsQuery : BaseRequest, IRequest<Result<List<ApartamentDTO>>>
    {
    }

    public class GetAvailableApartamentsQueryHandler : IRequestHandler<GetAvailableApartamentsQuery, Result<List<ApartamentDTO>>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public GetAvailableApartamentsQueryHandler(IApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<Result<List<ApartamentDTO>>> Handle(GetAvailableApartamentsQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var userId = request.GetUser();
                var apartaments = _context.UserApartaments.Include(x => x.Apartament).Where(x => x.UserId == userId && x.Apartament.IsDeleted != false).Select(x => x.Apartament).ToList();
                var result = _mapper.Map<List<ApartamentDTO>>(apartaments);
                return new Result<List<ApartamentDTO>>(true, result);

            }
            catch (Exception ex)
            {
                return new Result<List<ApartamentDTO>>(false, new List<string> { ex.Message });
            }
        }
    }
}
