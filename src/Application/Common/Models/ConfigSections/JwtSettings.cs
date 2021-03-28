using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Common.Models.ConfigSections
{
    public class JwtSettings
    {
        public string FlatMateIssuer { get; set; }
        public string FlatMateKey { get; set; }
    }
}
