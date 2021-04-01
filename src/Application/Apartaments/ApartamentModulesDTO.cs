using FlatMate_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Apartaments
{
    public class ApartamentModulesDTO
    {
        public List<ModuleDTO> CurrentModules { get; set; }
        public int ApartamentId { get; set; }
    }
}
