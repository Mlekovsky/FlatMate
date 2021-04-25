using FlatMate_backend.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Domain.Entities
{
    public class ReceiptPosition : AuditableEntity, ISoftDelete
    {
        public int Id { get; set; }
        public string Product { get; set; }
        public double Value { get; set; }

        public Receipt Receipt { get; set; }
        public IList<UserReceiptPosition> UserReceiptPositions{ get; set; }
        public bool IsDeleted { get; set; }
    }
}
