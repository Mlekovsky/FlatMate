using FlatMate_backend.Application.Users;
using FlatMate_backend.Application.Users.Queries.GetUser;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlatMate_backend.WebUI.Controllers
{
    public class AuthController : ApiController
    {
        [HttpPost]
        public async Task<UserDTO> Login(GetUserQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}
