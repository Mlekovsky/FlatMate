using FlatMate_backend.Application.Users;
using FlatMate_backend.Application.Users.Commands.CreateUser;
using FlatMate_backend.Application.Users.Queries.GetUser;
using Microsoft.AspNetCore.Authorization;
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
        [AllowAnonymous]
        [Route("Login")]
        public async Task<ActionResult> Login(GetUserLoginQuery query)
        {
            return Ok(await Mediator.Send(query));
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("Register")]
        public async Task<ActionResult> Register(CreateUserCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}
