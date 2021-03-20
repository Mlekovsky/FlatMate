using FlatMate_backend.Application.Users;
using FlatMate_backend.Application.Users.Commands.CreateUser;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlatMate_backend.WebUI.Controllers
{
    public class UserController : ApiController
    {
        public async Task<UserDTO> CreateUser(CreateUserCommand command)
        {
            throw new Exception();
        }
    }
}
