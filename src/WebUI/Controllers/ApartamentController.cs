using FlatMate_backend.Application.Apartaments.Commands.CreateApartament;
using FlatMate_backend.Application.Apartaments.Commands.DeleteApartament;
using FlatMate_backend.Application.Apartaments.Commands.UpdateApartament;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FlatMate_backend.WebUI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ApartamentController : ApiController
    {
        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult> Create(CreateApartamentCommand request)
        {
            request.SetUser(UserId);
            var result = await Mediator.Send(request);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost]
        [Route("Update")]
        public async Task<ActionResult> Update(UpdateApartamentCommand request)
        {
            request.SetUser(UserId);
            var result = await Mediator.Send(request);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<ActionResult> Delete(DeleteApartamentCommand request)
        {
            request.SetUser(UserId);
            var result = await Mediator.Send(request);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }
    }
}
