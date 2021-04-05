using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlatMate_backend.Infrastructure.Services
{
    public class TodoModuleVerificationService : ITodoModuleVerificationService
    {
        private readonly IApplicationDbContext _context;
        public TodoModuleVerificationService(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckUserApartament(Apartament apartament, User user)
        {
            
        }
    }
}
