using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Domain.Entities
{
    public class UserApartament
    {
        public int UserId { get; set; }
        public User User { get; set; }

        public int ApartamentId { get; set; }
        public Apartament Apartament { get; set; }
    }
}
