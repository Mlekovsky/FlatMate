using FlatMate_backend.Application.Common.Mappings;
using FlatMate_backend.Domain.Entities;

namespace FlatMate_backend.Application.TodoLists.Queries.ExportTodos
{
    public class TodoItemRecord : IMapFrom<TodoItem>
    {
        public string Title { get; set; }

        public bool Done { get; set; }
    }
}
