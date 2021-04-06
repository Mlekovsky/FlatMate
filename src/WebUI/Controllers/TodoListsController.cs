using FlatMate_backend.Application.TodoLists.Commands.CreateTodoList;
using FlatMate_backend.Application.TodoLists.Commands.DeleteTodoList;
using FlatMate_backend.Application.TodoLists.Commands.UpdateTodoList;
using FlatMate_backend.Application.TodoLists.Queries.ExportTodos;
using FlatMate_backend.Application.TodoLists.Queries.GetTodos;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FlatMate_backend.WebUI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TodoListsController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<TodosVm>> Get(int apartamentId)
        {
            var request = new GetTodosQuery();
            request.SetUser(UserId);
            request.ApartamentId = apartamentId;
            var result = await Mediator.Send(request);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        //[HttpGet("{id}")]
        //public async Task<FileResult> Get(int id)
        //{
        //    var vm = await Mediator.Send(new ExportTodosQuery { ListId = id });

        //    return File(vm.Content, vm.ContentType, vm.FileName);
        //}

        [HttpPost]
        public async Task<ActionResult> Create(CreateTodoListCommand command)
        {
            command.SetUser(UserId);
            var result = await Mediator.Send(command);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, UpdateTodoListCommand command)
        {
            command.SetUser(UserId);

            if (id != command.Id)
            {
                return BadRequest();
            }

            var result = await Mediator.Send(command);

            if (result.Succeeded)
            {
                return Ok(result.Response);
            }

            return BadRequest(result.Errors);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id, int apartamentId)
        {
            var request = new DeleteTodoListCommand { Id = id, ApartamentId = apartamentId };
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
