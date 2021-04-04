using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Domain.Common;
using FlatMate_backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System;
using System.Data;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Infrastructure.Persistence
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        private IDbContextTransaction _currentTransaction;

        public ApplicationDbContext(
            DbContextOptions options) : base(options)
        {
        }

        public DbSet<TodoList> TodoLists { get; set; }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<UserApartament> UserApartaments { get; set; }
        public DbSet<Apartament> Apartaments { get; set; }
        public DbSet<ApartamentModule> ApartamentModule { get; set; }
        public DbSet<Domain.Entities.Module> Modules { get; set; }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.Created = DateTime.Now;
                        break;
                    case EntityState.Modified:
                        entry.Entity.LastModified = DateTime.Now;
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        public async Task BeginTransactionAsync()
        {
            if (_currentTransaction != null)
            {
                return;
            }

            _currentTransaction = await base.Database.BeginTransactionAsync(IsolationLevel.ReadCommitted).ConfigureAwait(false);
        }

        public async Task CommitTransactionAsync()
        {
            try
            {
                await SaveChangesAsync().ConfigureAwait(false);

                _currentTransaction?.Commit();
            }
            catch
            {
                RollbackTransaction();
                throw;
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        public void RollbackTransaction()
        {
            try
            {
                _currentTransaction?.Rollback();
            }
            finally
            {
                if (_currentTransaction != null)
                {
                    _currentTransaction.Dispose();
                    _currentTransaction = null;
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            builder.Entity<UserApartament>()
                .HasKey(ua => new { ua.ApartamentId, ua.UserId });

            builder.Entity<UserApartament>()
                .HasOne(ua => ua.User)
                .WithMany(u => u.UserApartaments)
                .HasForeignKey(ua => ua.UserId);

            builder.Entity<UserApartament>()
                .HasOne(ua => ua.Apartament)
                .WithMany(a => a.UserApartaments)
                .HasForeignKey(ua => ua.ApartamentId);

            builder.Entity<ApartamentModule>()
                .HasKey(am => new { am.ApartamentId, am.ModuleId });

            builder.Entity<ApartamentModule>()
                .HasOne(am => am.Apartament)
                .WithMany(a => a.ApartamentModules)
                .HasForeignKey(am => am.ApartamentId);

            builder.Entity<ApartamentModule>()
                .HasOne(am => am.Module)
                .WithMany(m => m.ApartamentModules)
                .HasForeignKey(am => am.ModuleId);

            base.OnModelCreating(builder);
        }
    }
}
