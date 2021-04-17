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


namespace FlatMate_backend.Application.Users.Queries.GetUserInfo
{
    public class GetUserInfoQuery : BaseRequest,IRequest<Result<UserInfoDTO>>
    {
    }

    public class GetUserInfoQueryHandler : IRequestHandler<GetUserInfoQuery, Result<UserInfoDTO>>
    {
        private readonly IApplicationDbContext _context;
        public GetUserInfoQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Result<UserInfoDTO>> Handle(GetUserInfoQuery request, CancellationToken cancellationToken)
        {
            var userId = request.GetUser();

            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

                return new Result<UserInfoDTO>(true, new UserInfoDTO
                {
                    Email = user?.Email,
                    FirstName = user?.FirstName,
                    LastName = user?.LastName
                });
            }
            catch( Exception ex)
            {
                return new Result<UserInfoDTO>(false, new List<string> { ex.Message });
            }
        }
    }
}
