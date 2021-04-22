using FlatMate_backend.Domain.Common;
using FlatMate_backend.Domain.Enums;
using System;

namespace FlatMate_backend.Domain.Entities
{
    public class TodoItem : AuditableEntity, ISoftDelete
    {
        public int Id { get; set; }

        public int ListId { get; set; }

        public string Title { get; set; }

        public string Note { get; set; }

        public bool Done { get; set; }

        public DateTime? Reminder { get; set; }

        public PriorityLevel Priority { get; set; }


        public TodoList List { get; set; }
        public bool IsDeleted { get; set ; }
    }
}
