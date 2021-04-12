using FlatMate_backend.Application.Common.Helpers;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Application.Common.Models.ConfigSections;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Users.Queries.GetUser
{
    public class GetUserLoginQuery : IRequest<Result<UserDTO>>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class GetUserQueryHandler : IRequestHandler<GetUserLoginQuery, Result<UserDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IPasswordEncryptorService _passwordService;
        private readonly PasswordSettings _secretKeySettings;
        private readonly JwtSettings _jwtSettings;

        public GetUserQueryHandler(IApplicationDbContext context,
            IPasswordEncryptorService passwordEncryptorService,
            PasswordSettings secretKeySettings,
            JwtSettings jwtSettings)
        {
            _passwordService = passwordEncryptorService;
            _context = context;
            _secretKeySettings = secretKeySettings;
            _jwtSettings = jwtSettings;
        }

        public async Task<Result<UserDTO>> Handle(GetUserLoginQuery request, CancellationToken cancellationToken)
        {
            var user = new UserDTO();
            List<string> errors = new List<string>();

            try
            {
                var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == request.Email);

                if (dbUser == null)
                {
                    errors.Add("User does not exists");
                    return new Result<UserDTO>(false, errors);
                }

                byte[] passwordKey = NullableStringHelper.GetBytesFromHexString(_secretKeySettings.PasswordSecretKey);
                var password = _passwordService.DecryptPasswordWithAes(dbUser.PasswordHash, passwordKey, dbUser.PasswordKey);

                if (password.Equals(request.Password))
                {
                    user.Id = dbUser.Id;
                    user.Email = dbUser.Email;
                    user.FirstName = dbUser.FirstName;
                    user.LastName = dbUser.LastName;
                    user.AssignedApartaments = _context.UserApartaments.Where(x => x.UserId == dbUser.Id).Select(x => x.ApartamentId).ToArray();
                }
                else
                {
                    errors.Add("Password does not match!");
                    return new Result<UserDTO>(false, errors);
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_jwtSettings.FlatMateKey);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Issuer = _jwtSettings.FlatMateIssuer,
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim(JwtRegisteredClaimNames.Sid, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email)
                }),
                    Expires = DateTime.UtcNow.AddMinutes(60),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                user.Token = tokenHandler.WriteToken(token);

                return new Result<UserDTO>(true, user);
            }
            catch (Exception ex)
            {
                return new Result<UserDTO>(false, new List<string> { ex.Message });
            }
        }
    }
}
