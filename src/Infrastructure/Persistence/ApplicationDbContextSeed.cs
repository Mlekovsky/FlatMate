using FlatMate_backend.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace FlatMate_backend.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            // Seed, if necessary
            if (!context.TodoLists.Any())
            {
                context.TodoLists.Add(new TodoList
                {
                    Title = "Kuchnia",
                    Items =
                    {
                        new TodoItem { Title = "Mycie podłóg", Done = true },
                        new TodoItem { Title = "Wyczyszczenie zmywarki"},
                    }
                });

                context.TodoLists.Add(new TodoList
                {
                    Title = "Łazienka",
                    Items =
                    {
                        new TodoItem { Title = "Czyszczenie pralki", Done = true },
                        new TodoItem { Title = "Wymiana baterii prysznica"},
                    }
                });

                await context.SaveChangesAsync();
            }
        }
    }
}
