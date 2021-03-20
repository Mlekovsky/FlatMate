using FlatMate_backend.Application.Common.Helpers;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Users.Queries.GetUser
{
    public class GetUserQuery : IRequest<UserDTO>
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }

    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, UserDTO>
    {
        private readonly IApplicationDbContext _context;
        private readonly IPasswordEncryptorService _passwordService;
        private readonly SecretKeySettings _secretKeySettings;

        public GetUserQueryHandler(IApplicationDbContext context,
            IPasswordEncryptorService passwordEncryptorService,
            SecretKeySettings secretKeySettings)
        {
            _passwordService = passwordEncryptorService;
            _context = context;
            _secretKeySettings = secretKeySettings;
        }

        public async Task<UserDTO> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var result = new UserDTO();
            var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);

            if (dbUser == null)
                throw new Exception("User does not exists");

            byte[] passwordKey = NullableStringHelper.GetBytesFromHexString(_secretKeySettings.PasswordSecretKey);
            var password = _passwordService.DecryptPasswordWithAes(dbUser.PasswordHash, passwordKey, dbUser.PasswordKey);

            if (password.Equals(request.Password))
            {
                result.Id = dbUser.Id;
                result.Email = dbUser.Email;
                result.FirstName = dbUser.FirstName;
                result.LastName = dbUser.LastName;
            }
            else
            {
                throw new Exception("Password does not match!");
            }

            return result;
        }
    }
}
