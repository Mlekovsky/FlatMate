using FlatMate_backend.Application.TodoLists.Queries.GetTodos;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Receipts
{
    public class ReceiptPositionDTO
    {
        public int Id { get; set; }
        public int ReceiptId { get; set; }
        public string Product { get; set; }
        public double Value { get; set; }

        public List<AssignableUsersDTO> AssignedUsers { get; set; }

        public ReceiptPositionDTO()
        {
            AssignedUsers = new List<AssignableUsersDTO>();
        }
    }
}
