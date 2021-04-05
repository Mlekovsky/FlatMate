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

namespace FlatMate_backend.Application.Apartaments.Commands.UpdateApartamentModules
{
    public class UpdateApartamentModulesCommand : BaseRequest, IRequest<Result<ApartamentModulesDTO>>
    {
        public int ApartamentId { get; set; }
        public List<int> Modules { get; set; }
    }

    public class UpdateApartamentModulesCommandHandler : IRequestHandler<UpdateApartamentModulesCommand, Result<ApartamentModulesDTO>>
    {
        private readonly IApplicationDbContext _context;

        public UpdateApartamentModulesCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Result<ApartamentModulesDTO>> Handle(UpdateApartamentModulesCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var apartamentDb = await _context.Apartaments.FirstOrDefaultAsync(x => x.Id == request.ApartamentId);

                var userId = request.GetUser();

                if (apartamentDb == null)
                {
                    return new Result<ApartamentModulesDTO>(false, new List<string> { $"Cannot find any apratament with id {request.ApartamentId}" });
                }

                if (!apartamentDb.UserApartaments.Any(x => x.UserId == userId))
                {
                    return new Result<ApartamentModulesDTO>(false, new List<string> { "User does not belong to edited apartament" });
                }

                var returnModules = new List<ModuleDTO>();

                foreach (var moduleId in request.Modules)
                {
                    var aparatmentModule = apartamentDb.ApartamentModules.FirstOrDefault(x => x.ModuleId == moduleId);

                    if (aparatmentModule != null)
                    {
                        continue; //Moduł już dodany do mieszkania
                    }

                    var module = await _context.Module.FirstOrDefaultAsync(x => x.Id == moduleId);

                    if (module == null)
                    {
                        return new Result<ApartamentModulesDTO>(false, new List<string> { $"Cannot find any module with id: {moduleId}" });
                    }

                    apartamentDb.ApartamentModules.Add(new Domain.Entities.ApartamentModule
                    {
                        Module = module,
                        Apartament = apartamentDb
                    });

                    returnModules.Add(new ModuleDTO 
                    { 
                        Id = module.Id,
                        Name = module.Name
                    });
                }

                var modulesToRemove = apartamentDb?.ApartamentModules?.Select(x => x.ModuleId).Except(request.Modules);

                if (modulesToRemove.Any())
                {
                    foreach (var toRemove in modulesToRemove)
                    {
                        var moduleToRemove = apartamentDb.ApartamentModules.FirstOrDefault(x => x.ModuleId == toRemove);
                        apartamentDb.ApartamentModules.Remove(moduleToRemove);
                    }
                }

                apartamentDb.LastModified = DateTime.Now;
                apartamentDb.LastModifiedBy = userId.ToString();
                
                await _context.SaveChangesAsync(cancellationToken);

                return new Result<ApartamentModulesDTO>(true, new ApartamentModulesDTO
                {
                    ApartamentId = apartamentDb.Id,
                    CurrentModules = returnModules
                });
            }
            catch (Exception ex)
            {
                return new Result<ApartamentModulesDTO>(false, new List<string> { ex.Message });
            }
        }
    }

}
