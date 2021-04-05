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

namespace FlatMate_backend.Application.Apartaments.Commands.RemoveUserApartament
{
    public class RemoveUserApartamentCommand : BaseRequest, IRequest<Result<bool>>
    {
        public int ApartamentId { get; set; }
    }

    public class RemoveUserApartamentCommandHandler : IRequestHandler<RemoveUserApartamentCommand, Result<bool>>
    {
        private readonly IApplicationDbContext _context;

        public RemoveUserApartamentCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Result<bool>> Handle(RemoveUserApartamentCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var apartamentDb = await _context.Apartaments.Include(x => x.UserApartaments).FirstOrDefaultAsync(x => x.Id == request.ApartamentId);

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

                if (!apartamentDb.UserApartaments.Any(x => x.UserId == userId))
                {
                    return new Result<bool>(false, new List<string> { "User is not assigned to this apartament" });
                }

                var userApartament = await _context.UserApartaments.FirstOrDefaultAsync(x => x.UserId == userId && x.ApartamentId == request.ApartamentId);

                if (userApartament != null)
                {
                    _context.UserApartaments.Remove(userApartament);
                }

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
