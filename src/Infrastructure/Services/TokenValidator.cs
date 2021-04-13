using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models.ConfigSections;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Principal;
using System.Text;

namespace FlatMate_backend.Infrastructure.Services
{
    public class TokenValidator : ITokenValidator
    {
        private readonly JwtSettings _jwtSettings;
        public TokenValidator(JwtSettings jwtSettings)
        {
            _jwtSettings = jwtSettings;
        }
        public bool ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ValidateIssuer = true,
                ValidateAudience = false,
                ValidateActor = false,
                ValidIssuer = _jwtSettings.FlatMateIssuer,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.FlatMateKey))
            };

            SecurityToken validatedToken;
            try
            {
                IPrincipal principal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
            }
            catch(Exception ex)
            {
                return false;
            }

            return true;
        }
    }
}
