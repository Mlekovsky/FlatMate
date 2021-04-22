using FlatMate_backend.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Domain.Entities
{
    public class Apartament : AuditableEntity, ISoftDelete
    {
        public int Id { get; set; }
        public string ShortName { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordKey { get; set; }

        public ICollection<UserApartament> UserApartaments { get; set; }
        public ICollection<ApartamentModule> ApartamentModules { get; set; }
        public bool IsDeleted { get; set; }
    }
}
