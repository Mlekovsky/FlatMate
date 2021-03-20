using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Domain.Entities
{
    public class UserRole
    {
        public UserRole(string name, int userId)
        {
            Name = name;
            UserId = userId;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int UserId { get; set; }

        public User User { get; set; }
    }
}
