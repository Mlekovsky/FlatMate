using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Apartaments
{
    public class ApartamentDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public int UsersInApartment { get; set; }
    }
}
