using AutoMapper;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Modules.Queries.GetModulesInfo
{
    public class GetModulesInfoQuery : BaseRequest, IRequest<Result<ModuleInfoListDTO>>
    {

    }

    public class GetModulesInfoQueryHandle : IRequestHandler<GetModulesInfoQuery, Result<ModuleInfoListDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetModulesInfoQueryHandle(IApplicationDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<ModuleInfoListDTO>> Handle(GetModulesInfoQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var modules = await _context.Modules.ToListAsync();
                var returnModules = new List<ModuleInfoDTO>();

                foreach (var module in modules)
                {
                    returnModules.Add(_mapper.Map<ModuleInfoDTO>(module));
                }

                return new Result<ModuleInfoListDTO>(true, new ModuleInfoListDTO { ModulesInfo = returnModules });
            }
            catch (Exception ex)
            {
                return new Result<ModuleInfoListDTO>(false, new List<string> { ex.Message });
            }
        }
    }
}
