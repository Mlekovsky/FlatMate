using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Users.Commands.Authorize
{
    public class AuthorizeCommand : IRequest<Result<bool>>
    {
        public string Token { get; set; }
    }

    public class AuthorizeCommandHandler : IRequestHandler<AuthorizeCommand, Result<bool>>
    {
        private readonly ITokenValidator _tokenValidator;
        public AuthorizeCommandHandler(ITokenValidator tokenValidator)
        {
            _tokenValidator = tokenValidator;
        }

        public async Task<Result<bool>> Handle(AuthorizeCommand request, CancellationToken cancellationToken)
        {
            if (_tokenValidator.ValidateToken(request.Token))
            {
                return new Result<bool>(true, true);
            }

            return new Result<bool>(false, new List<string> { "Token is not valid!" });
        }
    }

}
