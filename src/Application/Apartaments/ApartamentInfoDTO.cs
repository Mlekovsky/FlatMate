using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Apartaments
{
    public class ApartamentInfoDTO
    {
        public int Id { get; set; }
        public string ShortName { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public List<ModuleDTO> CurrentModules { get; set; }

        public ApartamentInfoDTO()
        {
            CurrentModules = new List<ModuleDTO>();
        }
    }
}
