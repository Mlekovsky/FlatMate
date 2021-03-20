using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Infrastructure.Files;
using FlatMate_backend.Infrastructure.Persistence;
using FlatMate_backend.Infrastructure.Services;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FlatMate_backend.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            if (configuration.GetValue<bool>("UseInMemoryDatabase"))
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase("FlatMate_backendDb"));
            }
            else
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(
                        configuration.GetConnectionString("DefaultConnection"),
                        b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
            }

            services.AddScoped<IApplicationDbContext>(provider => provider.GetService<ApplicationDbContext>());

            services.AddTransient<ICsvFileBuilder, CsvFileBuilder>();
            services.AddTransient<IPasswordEncryptorService, PasswordEncryptorService>();

            var storeOptions = new ConfigurationStoreOptions();
            services.AddSingleton(storeOptions);

            return services;
        }
    }
}
