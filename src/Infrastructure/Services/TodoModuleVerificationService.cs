using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models.Constants;
using FlatMate_backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
            bool result = true;

            //Jeśli mieszkanie nie ma aktywowanego modułu
            if (!apartament.ApartamentModules.Any(x => x.ModuleId == (int)Modules.TodoList))
            {
                result = false;
            }

            //Jeśli użytkownik nie należy do mieszkania
            if (!apartament.UserApartaments.Any(x => x.UserId == user.Id))
            {
                result = false;
            }

            return result;
        }

        public async Task<bool> CheckTodoList(int listId, Apartament apartament)
        {
            bool result = true;

            //Jeśli dana lista nie należy do mieszkania
            if (!_context.TodoLists.Any(x => x.Id == listId && x.Apartament.Id == apartament.Id))
            {
                result = false;
            }

            return result;
        }

        public async Task<bool> CheckTodoItem(int itemId, Apartament apartament)
        {
            bool result = true;

            var item = await _context.TodoItems.FirstOrDefaultAsync(x => x.Id == itemId);
            var list = await _context.TodoLists.FirstOrDefaultAsync(x => x.Id == item.ListId && x.Apartament.Id == apartament.Id);

            if (list == null)
            {
                result = false;
            }

            return result;
        }
    }
}
