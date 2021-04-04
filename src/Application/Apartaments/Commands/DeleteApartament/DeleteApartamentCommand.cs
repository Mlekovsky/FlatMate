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

namespace FlatMate_backend.Application.Apartaments.Commands.DeleteApartament
{
    public class DeleteApartamentCommand : BaseRequest, IRequest<Result<bool>>
    {
        public int ApartamentId { get; set; }
    }

    public class DeleteApartamentCommandHandler : IRequestHandler<DeleteApartamentCommand, Result<bool>>
    {
        private readonly IApplicationDbContext _context;

        public DeleteApartamentCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<bool>> Handle(DeleteApartamentCommand request, CancellationToken cancellationToken)
        {
            var userId = request.GetUser();

            try
            {
                var apartamentDb = await _context.Apartaments.FirstOrDefaultAsync(x => x.Id == request.ApartamentId);
                if (apartamentDb == null)
                {
                    return new Result<bool>(false, new List<string> { "Apartament already deleted!" });
                }

                if (!apartamentDb.UserApartaments.Any(x => x.UserId == userId))
                {
                    return new Result<bool>(false, new List<string> { "User does not belong to edited apartament" });
                }

                var apartamentUsers = _context.UserApartaments.Where(x => x.ApartamentId == apartamentDb.Id);

                var apartamentModules = _context.ApartamentModule.Where(x => x.ApartamentId == apartamentDb.Id);

                foreach(var apartamentUser in apartamentUsers)
                {
                    _context.UserApartaments.Remove(apartamentUser);
                }

                foreach(var apartamentModule in apartamentModules)
                {
                    _context.ApartamentModule.Remove(apartamentModule);
                }

                _context.Apartaments.Remove(apartamentDb);

                await _context.SaveChangesAsync(cancellationToken);

                return new Result<bool>(true, true);
            }
            catch (Exception ex)
            {
                return new Result<bool>(false, new List<string> { ex.Message });
            }
        }
    }

}
