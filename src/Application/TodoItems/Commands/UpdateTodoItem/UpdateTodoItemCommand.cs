using FlatMate_backend.Application.Common.Exceptions;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.TodoItems.Commands.UpdateTodoItem
{
    public partial class UpdateTodoItemCommand : BaseRequest, IRequest<Result<bool>>
    {
        public int Id { get; set; }
        public bool Done { get; set; }
        public int ApartamentId { get; set; }
    }

    public class UpdateTodoItemCommandHandler : IRequestHandler<UpdateTodoItemCommand, Result<bool>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ITodoModuleVerificationService _todoModuleVerification;

        public UpdateTodoItemCommandHandler(IApplicationDbContext context,
            ITodoModuleVerificationService todoModuleVerification)
        {
            _context = context;
            _todoModuleVerification = todoModuleVerification;
        }

        public async Task<Result<bool>> Handle(UpdateTodoItemCommand request, CancellationToken cancellationToken)
        {
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

            if (!await _todoModuleVerification.CheckUserApartament(apartamentDb, user) || !await _todoModuleVerification.CheckTodoItem(request.Id, apartamentDb))
            {
                return new Result<bool>(false, new List<string> { "Cannot update item form list for this apartament" });
            }

            var entity = await _context.TodoItems.FindAsync(request.Id);

            if (entity == null)
            {
                return new Result<bool>(false, new List<string> { "Cannot find any item to update" });
            }

            entity.Done = request.Done;

            await _context.SaveChangesAsync(cancellationToken);

            return new Result<bool>(true, true);
        }
    }
}
