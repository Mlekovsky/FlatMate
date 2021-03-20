using FlatMate_backend.Application.Common.Exceptions;
using FlatMate_backend.Application.TodoLists.Commands.CreateTodoList;
using FlatMate_backend.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.IntegrationTests.TodoLists.Commands
{
    using static Testing;

    public class CreateTodoListTests : TestBase
    {
        [Test]
        public void ShouldRequireMinimumFields()
        {
            var command = new CreateTodoListCommand();

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldRequireUniqueTitle()
        {
            await SendAsync(new CreateTodoListCommand
            {
                Title = "Shopping"
            });

            var command = new CreateTodoListCommand
            {
                Title = "Shopping"
            };

            FluentActions.Invoking(() =>
                SendAsync(command)).Should().Throw<ValidationException>();
        }

        [Test]
        public async Task ShouldCreateTodoList()
        {
            var command = new CreateTodoListCommand
            {
                Title = "Tasks"
            };

            var id = await SendAsync(command);

            var list = await FindAsync<TodoList>(id);

            list.Should().NotBeNull();
            list.Title.Should().Be(command.Title);
            list.Created.Should().BeCloseTo(DateTime.Now, 10000);
        }
    }
}
