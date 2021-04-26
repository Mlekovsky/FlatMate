using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using FlatMate_backend.Application.ReceiptsPosition.Commands.CreateReceiptPosition;
using FlatMate_backend.Application.ReceiptsPosition.Commands.UpdateReceiptPosition;
using FlatMate_backend.Application.ReceiptsPosition.Commands.DeleteReceiptPosition;

namespace FlatMate_backend.WebUI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReceiptPositionsController : ApiController
    {
        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult> Create(CreateReceiptPositionCommand request)
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
        public async Task<ActionResult> Update(UpdateReceiptPositionCommand request)
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
        public async Task<ActionResult> Delete(DeleteReceiptPositionCommand request)
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
