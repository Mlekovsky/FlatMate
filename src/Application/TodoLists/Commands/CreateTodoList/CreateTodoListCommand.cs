using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.TodoLists.Commands.CreateTodoList
{
    public partial class CreateTodoListCommand : BaseRequest, IRequest<Result<int>>
    {
        public int ApartamentId { get; set; }
        public string Title { get; set; }
    }

    public class CreateTodoListCommandHandler : IRequestHandler<CreateTodoListCommand, Result<int>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ITodoModuleVerificationService _todoModuleVerification;

        public CreateTodoListCommandHandler(IApplicationDbContext context,
            ITodoModuleVerificationService todoModuleVerification)
        {
            _context = context;
            _todoModuleVerification = todoModuleVerification;
        }

        public async Task<Result<int>> Handle(CreateTodoListCommand request, CancellationToken cancellationToken)
        {
            var apartamentDb = await _context.Apartaments
                .Include(x => x.UserApartaments)
                .FirstOrDefaultAsync(x => x.Id == request.ApartamentId);

            var userId = request.GetUser();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (apartamentDb == null)
            {
                return new Result<int>(false, new List<string> { $"Cannot find any apratament with id {request.ApartamentId}" });
            }

            if (user == null)
            {
                return new Result<int>(false, new List<string> { "User does not exist in system" });
            }

            if (!await _todoModuleVerification.CheckUserApartament(apartamentDb, user))
            {
                return new Result<int>(false, new List<string> { "Cannot add Todo list to this apartament" });
            }

            var entity = new TodoList();

            entity.Title = request.Title;

            _context.TodoLists.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return new Result<int>(true, entity.Id);
        }
    }
}
