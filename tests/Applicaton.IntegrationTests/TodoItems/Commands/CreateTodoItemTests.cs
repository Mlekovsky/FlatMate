using FlatMate_backend.Application.Common.Exceptions;
using FlatMate_backend.Application.TodoItems.Commands.CreateTodoItem;
using FlatMate_backend.Application.TodoLists.Commands.CreateTodoList;
using FlatMate_backend.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.IntegrationTests.TodoItems.Commands
{
    using static Testing;

    public class CreateTodoItemTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateTodoItemCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldCreateTodoItem()
        {
            var listId = await SendAsync(new CreateTodoListCommand
            {
                Title = "New List"
            });

            var command = new CreateTodoItemCommand
            {
                ListId = listId.Response,
                Title = "Tasks"
            };

            var itemId = await SendAsync(command);

            var item = await FindAsync<TodoItem>(itemId.Response);

            item.Should().NotBeNull();
            item.ListId.Should().Be(command.ListId);
            item.Title.Should().Be(command.Title);
            item.Created.Should().BeCloseTo(DateTime.Now, 10000);
            item.LastModifiedBy.Should().BeNull();
            item.LastModified.Should().BeNull();
        }
    }
}
