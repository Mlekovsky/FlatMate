using FlatMate_backend.Application.Common.Exceptions;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.TodoLists.Commands.DeleteTodoList
{
    public class DeleteTodoListCommand : BaseRequest, IRequest<Result<bool>>
    {
        public int Id { get; set; }
        public int ApartamentId { get; set; }
    }

    public class DeleteTodoListCommandHandler : IRequestHandler<DeleteTodoListCommand, Result<bool>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ITodoModuleVerificationService _todoModuleVerification;

        public DeleteTodoListCommandHandler(IApplicationDbContext context,
            ITodoModuleVerificationService todoModuleVerification)
        {
            _context = context;
            _todoModuleVerification = todoModuleVerification;
        }

        public async Task<Result<bool>> Handle(DeleteTodoListCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.TodoLists
                .Where(l => l.Id == request.Id)
                .SingleOrDefaultAsync(cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(TodoList), request.Id);
            }


            var apartamentDb = await _context.Apartaments
                .Include(x => x.UserApartaments)
                .Include(x => x.ApartamentModules)
                .FirstOrDefaultAsync(x => x.Id == request.ApartamentId);

            var userId = request.GetUser();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (apartamentDb == null)
            {
                return new Result<bool>(false, new List<string> { $"Cannot find any apratament with id {request.ApartamentId}" });
            }

            if (user == null)
            {
                return new Result<bool>(false, new List<string> { "User does not exist in system" });
            }

            if (!await _todoModuleVerification.CheckUserApartament(apartamentDb, user))
            {
                return new Result<bool>(false, new List<string> { "Cannot add Todo list to this apartament" });
            }

            _context.TodoLists.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return new Result<bool>(true, true);
        }
    }
}
