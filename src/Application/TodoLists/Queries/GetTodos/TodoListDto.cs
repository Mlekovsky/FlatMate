using FlatMate_backend.Application.Common.Mappings;
using FlatMate_backend.Domain.Entities;
using System.Collections.Generic;

namespace FlatMate_backend.Application.TodoLists.Queries.GetTodos
{
    public class TodoListDto : IMapFrom<TodoList>
{
    public TodoListDto()
    {
        Items = new List<TodoItemDto>();
    }

    public int Id { get; set; }

    public string Title { get; set; }

    public IList<TodoItemDto> Items { get; set; }
}
}
