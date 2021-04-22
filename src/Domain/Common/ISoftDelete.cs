using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Domain.Common
{
    public interface ISoftDelete
    {
        public bool IsDeleted { get; set; }
    }
}
