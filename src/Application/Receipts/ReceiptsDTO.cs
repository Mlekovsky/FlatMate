using FlatMate_backend.Application.TodoLists.Queries.GetTodos;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Receipts
{
    public class ReceiptsDTO
    {
        public List<ReceiptListDTO> Receipts { get; set; }
        public List<AssignableUsersDTO> Users { get; set; }
    }
}
