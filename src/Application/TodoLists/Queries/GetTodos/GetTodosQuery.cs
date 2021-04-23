using AutoMapper;
using AutoMapper.QueryableExtensions;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
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

            var result = new TodosVm
            {
                PriorityLevels = Enum.GetValues(typeof(PriorityLevel))
                    .Cast<PriorityLevel>()
                    .Select(p => new PriorityLevelDto { Value = (int)p, Name = p.ToString() })
                    .ToList(),

                Lists = await _context.TodoLists
                    .Where(x => x.Apartament.Id == apartamentDb.Id && x.IsDeleted == false)
                    .ProjectTo<TodoListDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.Title)
                    .ToListAsync(cancellationToken)
            };

            return new Result<TodosVm>(true, result);
        }
    }
}
