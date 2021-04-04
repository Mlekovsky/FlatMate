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

namespace FlatMate_backend.Application.Apartaments.Commands.UpdateApartament
{
    public class UpdateApartamentCommand : BaseRequest, IRequest<Result<ApartamentDTO>>
    {
        public int ApartamentId { get; set; }
        public string City { get; set; }
        public string ShortName { get; set; }
        public string Address { get; set; }
    }

    public class UpdateApartamentCommandHandler : IRequestHandler<UpdateApartamentCommand, Result<ApartamentDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public UpdateApartamentCommandHandler(IApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<ApartamentDTO>> Handle(UpdateApartamentCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var apartamentDb = await _context.Apartaments.FirstOrDefaultAsync(x => x.Id == request.ApartamentId);

                var userId = request.GetUser();

                if (apartamentDb == null)
                {
                    return new Result<ApartamentDTO>(false, new List<string> { $"Cannot find any apratament with id {request.ApartamentId}" });
                }

                if (!apartamentDb.UserApartaments.Any(x => x.UserId == userId))
                {
                    return new Result<ApartamentDTO>(false, new List<string> { "User does not belong to edited apartament" });
                }

                apartamentDb.ShortName = request.ShortName;
                apartamentDb.City = request.City;
                apartamentDb.Address = request.Address;

                apartamentDb.LastModifiedBy = userId.ToString();
                apartamentDb.LastModified = DateTime.Now;

                await _context.SaveChangesAsync(cancellationToken);

                return new Result<ApartamentDTO>(true, _mapper.Map<ApartamentDTO>(apartamentDb));
            }
            catch (Exception ex)
            {
                return new Result<ApartamentDTO>(false, new List<string> { ex.Message });
            }
        }
    }

}
