using FlatMate_backend.Application.Apartaments.Commands.AssignUserToApartament;
using FlatMate_backend.Application.Apartaments.Commands.CreateApartament;
using FlatMate_backend.Application.Apartaments.Commands.DeleteApartament;
using FlatMate_backend.Application.Apartaments.Commands.RemoveUserApartament;
using FlatMate_backend.Application.Apartaments.Commands.UpdateApartament;
using FlatMate_backend.Application.Apartaments.Commands.UpdateApartamentModules;
using FlatMate_backend.Application.Apartaments.Queries;
using FlatMate_backend.Application.Apartaments.Queries.GetApartamentInfo;
using FlatMate_backend.Domain.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost]
        [Route("UpdateModules")]
        public async Task<ActionResult> UpdateModules(UpdateApartamentModulesCommand request)
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
        [Route("AssignUserApartament")]
        public async Task<ActionResult> AssignUserApartament(AssignUserApartamentCommand request)
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
        [Route("RemoveUserApartament")]
        public async Task<ActionResult> RemoveUserApartament(RemoveUserApartamentCommand request)
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

        [HttpGet]
        [Route("Info/{apartamentId}")]
        public async Task<ActionResult> GetApartamentInfo(int apartamentId)
        {
            var request = new GetApartamentInfoQuery();
            request.SetUser(UserId);
            request.ApartamentId = apartamentId;

            var result = await Mediator.Send(request);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        [HttpGet]
        [Route("List")]
        public async Task<ActionResult> GetApartamentList(SortingOrder Order, string searchField)
        {
            var request = new GetApartamentsListQuery();
            request.SetUser(UserId);
            request.Order = Order;
            request.SearchField = searchField;
            if (request?.Order == null)
            {
                request.Order = SortingOrder.Ascending;
            }

            var result = await Mediator.Send(request);

            if (result.Succeeded)
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
