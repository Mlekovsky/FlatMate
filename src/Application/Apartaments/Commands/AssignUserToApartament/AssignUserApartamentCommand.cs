using FlatMate_backend.Application.Common.Helpers;
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

namespace FlatMate_backend.Application.Apartaments.Commands.AssignUserToApartament
{
    public class AssignUserApartamentCommand : BaseRequest, IRequest<Result<bool>>
    {
        public int ApartamentId { get; set; }
        public string ApartamentPassword { get; set; }
    }

    public class AssignUserApartamentCommandHandler : IRequestHandler<AssignUserApartamentCommand, Result<bool>>
    {
        private readonly IApplicationDbContext _context;
        private readonly PasswordSettings _secretKeySettings;
        private readonly IPasswordEncryptorService _passwordService;
        public AssignUserApartamentCommandHandler(IApplicationDbContext context,
            PasswordSettings passwordSettings,
            IPasswordEncryptorService passwordService)
        {
            _context = context;
            _secretKeySettings = passwordSettings;
            _passwordService = passwordService;
        }

        public async Task<Result<bool>> Handle(AssignUserApartamentCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var apartamentDb = await _context.Apartaments.Include(x => x.UserApartaments).FirstOrDefaultAsync(x => x.Id == request.ApartamentId);

                var userId = request.GetUser();
                var user = _context.Users.FirstOrDefault(x => x.Id == userId);

                if (apartamentDb == null)
                {
                    return new Result<bool>(false, new List<string> { $"Cannot find any apratament with id {request.ApartamentId}" });
                }

                if (user == null)
                {
                    return new Result<bool>(false, new List<string> { "User does not exist in system" });
                }

                if (apartamentDb.UserApartaments.Any(x => x.UserId == userId))
                {
                    return new Result<bool>(false, new List<string> { "User already assigned to selected apartament" });
                }

                byte[] passwordKey = NullableStringHelper.GetBytesFromHexString(_secretKeySettings.PasswordSecretKey);
                var password = _passwordService.DecryptPasswordWithAes(apartamentDb.PasswordHash, passwordKey, apartamentDb.PasswordKey);

                if (!password.Equals(request.ApartamentPassword))
                {
                    return new Result<bool>(false, new List<string> { "Password does not match" });
                }

                var userApartaments = new UserApartament
                {
                    Apartament = apartamentDb,
                    User = user
                };

                _context.UserApartaments.Add(userApartaments);

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
