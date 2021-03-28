using FlatMate_backend.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Domain.Entities
{
    public class User : AuditableEntity
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordKey { get; set; }

        public IList<RefreshToken> RefreshTokens { get; set; }
        public ICollection<UserApartament> UserApartaments { get; set; }
    }
}
