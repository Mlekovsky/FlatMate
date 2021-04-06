using FlatMate_backend.Application.TodoLists.Queries.GetTodos;
using FlatMate_backend.Domain.Entities;
using FluentAssertions;
using NUnit.Framework;
using System.Linq;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.IntegrationTests.TodoLists.Queries
{
    using static Testing;

    public class GetTodosTests : TestBase
    {
        [Test]
        public async Task ShouldReturnPriorityLevels()
        {
            var query = new GetTodosQuery();

            var result = await SendAsync(query);

            result.Response.PriorityLevels.Should().NotBeEmpty();
        }

        [Test]
        public async Task ShouldReturnAllListsAndItems()
        {
            await AddAsync(new TodoList
            {
                Title = "Shopping",
                Items =
                    {
                        new TodoItem { Title = "Apples", Done = true },
                        new TodoItem { Title = "Milk", Done = true },
                        new TodoItem { Title = "Bread", Done = true },
                        new TodoItem { Title = "Toilet paper" },
                        new TodoItem { Title = "Pasta" },
                        new TodoItem { Title = "Tissues" },
                        new TodoItem { Title = "Tuna" }
                    }
            });

            var query = new GetTodosQuery();

            var result = await SendAsync(query);

            result.Response.Lists.Should().HaveCount(1);
            result.Response.Lists.First().Items.Should().HaveCount(7);
        }
    }
}
