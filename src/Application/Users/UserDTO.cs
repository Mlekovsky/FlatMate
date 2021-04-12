﻿using System;
using System.Collections.Generic;
using System.Text;
using FlatMate_backend.Domain.Enums;

namespace FlatMate_backend.Application.Users
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int[] AssignedApartaments { get; set; }
        public string Token { get; set; }
    }
}
