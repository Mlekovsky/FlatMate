using FlatMate_backend.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace FlatMate_backend.Infrastructure.Factory
{
    public class MigrationFactory: IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetParent(Directory.GetCurrentDirectory()).FullName)
                .AddJsonFile("WebUI/appsettings.json")
                .Build();

            var rawSettings = configuration.GetSection("ConnectionStrings");
            var connectionString = new ConnectionStrings();
            rawSettings.Bind(connectionString);

            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            //TODO: Zmienic na pobieranie z settings, nie wiem czemu to teraz nie chce działać 
            optionsBuilder.UseSqlServer("Server=NE-LA-IPOPH396;Database=FlatMateDB;Integrated Security=True;");
            //optionsBuilder.UseSqlServer("Server=MLEKOMASZINA\\SQLEXPRESS;Database=FlatMateDB;Trusted_Connection=True;");

            return new ApplicationDbContext(optionsBuilder.Options);
        }
    }
}
