using FlatMate_backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<TodoList> TodoLists { get; set; }

        DbSet<TodoItem> TodoItems { get; set; }
        DbSet<User> Users { get; set; }
        DbSet<UserRole> UserRoles { get; set; }
        DbSet<RefreshToken> RefreshTokens { get; set; }
        DbSet<UserApartament> UserApartaments { get; set; }
        DbSet<Apartament> Apartaments { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}
