using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Common.Interfaces
{
    public interface ITokenValidator
    {
        bool ValidateToken(string token);
    }
}
