using FlatMate_backend.Application.Users;
using FlatMate_backend.Application.Users.Commands.CreateUser;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlatMate_backend.WebUI.Controllers
{
    public class UserController : ApiController
    {
        [HttpPost]
        public async Task<UserDTO> CreateUser(CreateUserCommand command)
        {
            throw new Exception();
        }
    }
}
