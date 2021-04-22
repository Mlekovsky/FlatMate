using FlatMate_backend.Domain.Common;
using System.Collections.Generic;

namespace FlatMate_backend.Domain.Entities
{
    public class TodoList : AuditableEntity, ISoftDelete
    {
        public TodoList()
        {
            Items = new List<TodoItem>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Colour { get; set; }

        public IList<TodoItem> Items { get; set; }
        public Apartament Apartament { get; set; }
        public bool IsDeleted { get; set; }
    }
}
