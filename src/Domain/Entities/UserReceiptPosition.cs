using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Domain.Entities
{
    public class UserReceiptPosition
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int ReceiptPositionId { get; set; }
        public ReceiptPosition ReceiptPosition{ get; set; }
    }
}
