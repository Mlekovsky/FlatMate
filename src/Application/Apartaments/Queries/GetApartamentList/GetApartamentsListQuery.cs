using AutoMapper;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using FlatMate_backend.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Apartaments.Queries
{
    public class GetApartamentsListQuery : BaseRequest, IRequest<Result<ApartamentsListDTO>>
    {
        public SortingOrder Order { get; set; }
        public string SearchField { get; set; }
    }

    public class GetApartamentsListQueryHandler : IRequestHandler<GetApartamentsListQuery, Result<ApartamentsListDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public GetApartamentsListQueryHandler(IApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<ApartamentsListDTO>> Handle(GetApartamentsListQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var apartaments = new List<ApartamentDTO>();
                var apartamentsDb = new List<Apartament>();

                if (!string.IsNullOrEmpty(request.SearchField))
                {
                    apartamentsDb = _context.Apartaments.Include(x => x.UserApartaments).Where(x => x.Address.Contains(request.SearchField)
                    || x.City.Contains(request.SearchField)
                    || x.ShortName.Contains(request.SearchField)).ToList();

                }
                else
                {
                    apartamentsDb = _context.Apartaments.ToList();
                }

                foreach (var apartament in apartamentsDb)
                {
                    apartaments.Add(new ApartamentDTO
                    {
                        Address = apartament.Address,
                        City = apartament.City,
                        Name = apartament.ShortName,
                        Id = apartament.Id,
                        UsersInApartment = _context.UserApartaments.Count(x => x.ApartamentId == apartament.Id)
                    });
                }

                switch (request.Order)
                {
                    case SortingOrder.Descending:
                        apartaments = apartaments.OrderBy(x => x.Name).ToList();
                        break;

                    case SortingOrder.Ascending:
                    default:
                        apartaments = apartaments.OrderByDescending(x => x.Name).ToList();
                        break;
                }

                return new Result<ApartamentsListDTO>(true, new ApartamentsListDTO { Apartaments = apartaments });
            }
            catch (Exception ex)
            {
                return new Result<ApartamentsListDTO>(false, new List<string> { ex.Message });
            }
        }
    }
}
