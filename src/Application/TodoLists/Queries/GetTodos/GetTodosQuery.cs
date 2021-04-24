using AutoMapper;
using AutoMapper.QueryableExtensions;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using FlatMate_backend.Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.TodoLists.Queries.GetTodos
{
    public class GetTodosQuery : BaseRequest, IRequest<Result<TodosVm>>
    {
        public int ApartamentId { get; set; }
    }

    public class GetTodosQueryHandler : IRequestHandler<GetTodosQuery, Result<TodosVm>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly ITodoModuleVerificationService _todoModuleVerification;

        public GetTodosQueryHandler(IApplicationDbContext context, IMapper mapper, ITodoModuleVerificationService todoModuleVerification)
        {
            _context = context;
            _mapper = mapper;
            _todoModuleVerification = todoModuleVerification;
        }

        public async Task<Result<TodosVm>> Handle(GetTodosQuery request, CancellationToken cancellationToken)
        {
            var apartamentDb = await _context.Apartaments
             .Include(x => x.UserApartaments)
             .Include(x => x.ApartamentModules)
             .FirstOrDefaultAsync(x => x.Id == request.ApartamentId && x.IsDeleted == false);

            var userId = request.GetUser();
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId && x.IsDeleted == false);

            if (apartamentDb == null)
            {
                return new Result<TodosVm>(false, new List<string> { $"Cannot find any apratament with id {request.ApartamentId}" });
            }

            if (user == null)
            {
                return new Result<TodosVm>(false, new List<string> { "User does not exist in system" });
            }

            if (!await _todoModuleVerification.CheckUserApartament(apartamentDb, user))
            {
                return new Result<TodosVm>(false, new List<string> { "Cannot search list from this apartament" });
            }

            var currentApartamentUsersIds = await _context.UserApartaments
                .Include(x => x.User)
                .Where(x => x.ApartamentId == request.ApartamentId && x.User.IsDeleted == false)
                .Select(x => x.UserId).ToListAsync();

            var assignableUsers = await _context.Users
                .Where(x => currentApartamentUsersIds.Contains(x.Id))
                .Select(x => new AssignableUsersDTO { User = string.Concat(x.FirstName, " ", x.LastName), UserId = x.Id })
                .ToListAsync();

            var lists = await _context.TodoLists
                    .Include(x => x.Items)
                    .ThenInclude(y => y.AssignedUser)
                    .Where(x => x.Apartament.Id == apartamentDb.Id && x.IsDeleted == false)
                    .OrderBy(t => t.Title)
                    .ToListAsync(cancellationToken);

            var returnList = new List<TodoListDto>();

            foreach (var list in lists)
            {
                var toAdd = new TodoListDto
                {
                    Id = list.Id,
                    Title = list.Title
                };

                List<TodoItemDto> todoToAdd = new List<TodoItemDto>();

                foreach (var item in list.Items.Where(x => x.IsDeleted == false))
                {
                    User assignUser = new User();
                    if (item?.AssignedUser != null)
                        assignUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == item.AssignedUser.Id && x.IsDeleted == false);

                    todoToAdd.Add(new TodoItemDto
                    {
                        Done = item.Done,
                        Id = item.Id,
                        ListId = list.Id,
                        Title = item.Title,
                        AssignedUser = string.Concat(assignUser?.FirstName, " ", assignUser?.LastName),
                        AssignedUserId = assignUser?.Id ?? 0
                    });
                }
                toAdd.Items = todoToAdd;
                returnList.Add(toAdd);
            }

            var result = new TodosVm
            {
                PriorityLevels = Enum.GetValues(typeof(PriorityLevel))
                    .Cast<PriorityLevel>()
                    .Select(p => new PriorityLevelDto { Value = (int)p, Name = p.ToString() })
                    .ToList(),

                Lists = returnList,

                Users = assignableUsers
            };

            return new Result<TodosVm>(true, result);
        }
    }
}
