using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.TodoItems.Commands.CreateTodoItem
{
    public class CreateTodoItemCommand : BaseRequest, IRequest<Result<int>>
    {
        public int ListId { get; set; }
        public string Title { get; set; }
        public int ApartamentId { get; set; }
    }

    public class CreateTodoItemCommandHandler : IRequestHandler<CreateTodoItemCommand, Result<int>>
    {
        private readonly IApplicationDbContext _context;
        private readonly ITodoModuleVerificationService _todoModuleVerification;

        public CreateTodoItemCommandHandler(IApplicationDbContext context,
            ITodoModuleVerificationService todoModuleVerification)
        {
            _context = context;
            _todoModuleVerification = todoModuleVerification;
        }

        public async Task<Result<int>> Handle(CreateTodoItemCommand request, CancellationToken cancellationToken)
        {
            var apartamentDb = await _context.Apartaments
           .Include(x => x.UserApartaments)
           .Include(x => x.ApartamentModules)
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

            if (!await _todoModuleVerification.CheckUserApartament(apartamentDb, user) || !await _todoModuleVerification.CheckTodoList(request.ListId, apartamentDb))
            {
                return new Result<int>(false, new List<string> { "Cannot add item to list for this apartament" });
            }

            var entity = new TodoItem
            {
                ListId = request.ListId,
                Title = request.Title,
                Done = false,
                Created = DateTime.Now,
                CreatedBy = userId.ToString()
            };

            _context.TodoItems.Add(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return new Result<int>(true, entity.Id);
        }
    }
}
