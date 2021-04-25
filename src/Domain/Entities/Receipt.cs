using FlatMate_backend.Domain.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Domain.Entities
{
    public class Receipt: AuditableEntity, ISoftDelete
    {
        public Receipt()
        {
            Positions = new List<ReceiptPosition>();
        }
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public bool Paid { get; set; }

        //Właściwości nawigacyjne
        public Apartament Apartament { get; set; }
        public User PaidBy { get; set; }
        public IList<ReceiptPosition> Positions { get; set; }
        public bool IsDeleted { get; set ; }
    }
}
