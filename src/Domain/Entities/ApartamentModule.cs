using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Domain.Entities
{
    public class ApartamentModule
    {
        public int ApartamentId { get; set; }
        public Apartament Apartament { get; set; }
        public int ModuleId { get; set; }
        public Module Module { get; set; }
    }
}
