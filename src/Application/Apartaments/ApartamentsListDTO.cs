using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Apartaments
{
    public class ApartamentsListDTO
    {
        public List<ApartamentDTO> Apartaments { get; set; }

        public ApartamentsListDTO()
        {
            Apartaments = new List<ApartamentDTO>();
        }
    }
}
