using FlatMate_backend.Application.TodoItems.Commands.CreateTodoItem;
using FlatMate_backend.Application.TodoItems.Commands.DeleteTodoItem;
using FlatMate_backend.Application.TodoItems.Commands.UpdateTodoItem;
using FlatMate_backend.Application.TodoItems.Commands.UpdateTodoItemDetail;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FlatMate_backend.WebUI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TodoItemsController : ApiController
    {
        [HttpPost]
        [Route("Create")]
        public async Task<ActionResult> Create(CreateTodoItemCommand command)
        {
            command.SetUser(UserId);
            var result = await Mediator.Send(command);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost]
        [Route("Update")]
        public async Task<ActionResult> Update(int id, UpdateTodoItemCommand command)
        {
            command.SetUser(UserId);
            var result = await Mediator.Send(command);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        [HttpPost]
        [Route("UpdateDetails")]
        public async Task<ActionResult> UpdateItemDetails(UpdateTodoItemDetailCommand command)
        {
            command.SetUser(UserId);
            var result = await Mediator.Send(command);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(DeleteTodoItemCommand request)
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
