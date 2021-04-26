using FlatMate_backend.Application.Receipts;
using FlatMate_backend.Application.Receipts.Commands.CreateReceipt;
using FlatMate_backend.Application.Receipts.Commands.DeleteReceipt;
using FlatMate_backend.Application.Receipts.Commands.UpdateReceipt;
using FlatMate_backend.Application.Receipts.Commands.UpdateReceiptStatus;
using FlatMate_backend.Application.Receipts.Queries;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FlatMate_backend.WebUI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ReceiptsController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult> Get(int apartamentId, ReceiptFilterMode mode)
        {
            var request = new GetReceiptsQuery();

            request.ApartamentId = apartamentId;
            request.Filter = mode;
            request.SetUser(UserId);

            var result = await Mediator.Send(request);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult> Create(CreateReceiptCommand request)
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
        public async Task<ActionResult> Update(UpdateReceiptCommand request)
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
        [Route("UpdateStatus")]
        public async Task<ActionResult> UpdateStatus(UpdateReceiptStatusCommand request)
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
        public async Task<ActionResult> Delete(DeleteReceiptCommand request)
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
