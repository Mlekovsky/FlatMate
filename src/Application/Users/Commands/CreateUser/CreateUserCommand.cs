using FlatMate_backend.Application.Common.Helpers;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Users.Commands.CreateUser
{
    public class CreateUserCommand : BaseRequest, IRequest<Result<bool>>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, Result<bool>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IPasswordEncryptorService _passwordService;
        private readonly PasswordSettings _secretKeySettings;

        public CreateUserCommandHandler(IApplicationDbContext context,
            IPasswordEncryptorService passwordEncryptorService,
            PasswordSettings secretKeySettings)
        {
            _context = context;
            _passwordService = passwordEncryptorService;
            _secretKeySettings = secretKeySettings;
        }

        public async Task<Result<bool>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email
            };

            try
            {
                byte[] passwordKey = NullableStringHelper.GetBytesFromHexString(_secretKeySettings.PasswordSecretKey);
                (user.PasswordHash, user.PasswordKey) = _passwordService.EncryptPasswordWithAes(request.Password, passwordKey);

                _context.Users.Add(user);

                await _context.SaveChangesAsync(cancellationToken);
                return new Result<bool>(true, true);
            }
            catch (Exception ex)
            {
                return new Result<bool>(succeeded: false, errors: new List<string> { ex.Message });
            }
        }

    }
}

