using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Receipts
{
    public class ReceiptListDTO
    {
        public int Id { get; set; }
        public bool Paid { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public double TotalValue { get; set; }
        public List<UserReceiptTotalValueDTO> UserTotalValues { get; set; }

        public List<ReceiptPositionDTO> Positions { get; set; }

        public ReceiptListDTO()
        {
            Positions = new List<ReceiptPositionDTO>();
        }
    }
}
