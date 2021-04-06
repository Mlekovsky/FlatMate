using FlatMate_backend.Application.Common.Exceptions;
using FlatMate_backend.Application.TodoItems.Commands.CreateTodoItem;
using FlatMate_backend.Application.TodoItems.Commands.DeleteTodoItem;
using FlatMate_backend.Application.TodoLists.Commands.CreateTodoList;
using FlatMate_backend.Domain.Entities;
using FluentAssertions;
using System.Threading.Tasks;
using NUnit.Framework;

namespace FlatMate_backend.Application.IntegrationTests.TodoItems.Commands
{
    using static Testing;

    public class DeleteTodoItemTests : TestBase
    {
        [Test]
        public void ShouldRequireValidTodoItemId()
        {
            var command = new DeleteTodoItemCommand { Id = 99 };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<NotFoundException>();
        }

        [Test]
        public async Task ShouldDeleteTodoItem()
        {
            var listId = await SendAsync(new CreateTodoListCommand
            {
                Title = "New List"
            });

            var itemId = await SendAsync(new CreateTodoItemCommand
            {
                ListId = listId.Response,
                Title = "New Item"
            });

            await SendAsync(new DeleteTodoItemCommand
            {
                Id = itemId.Response
            });

            var list = await FindAsync<TodoItem>(listId.Response);

            list.Should().BeNull();
        }
    }
}
