using FlatMate_backend.Domain.Entities;
using FlatMate_backend.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace FlatMate_backend.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager)
        {
            var defaultUser = new ApplicationUser { UserName = "administrator@localhost", Email = "administrator@localhost" };

            if (userManager.Users.All(u => u.UserName != defaultUser.UserName))
            {
                await userManager.CreateAsync(defaultUser, "Administrator1!");
            }
        }

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
