using FlatMate_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Common.Interfaces
{
    public interface ITodoModuleVerificationService
    {
        Task<bool> CheckUserApartament(Apartament apartament, User user);
        Task<bool> CheckTodoList(int listId, Apartament apartament);
        Task<bool> CheckTodoItem(int itemId, Apartament apartament);
    }
}
