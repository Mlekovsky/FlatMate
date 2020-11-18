using FlatMate_backend.Application.TodoLists.Queries.ExportTodos;
using System.Collections.Generic;

namespace FlatMate_backend.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);
    }
}
