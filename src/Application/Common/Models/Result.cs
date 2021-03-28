using System.Collections.Generic;
using System.Linq;

namespace FlatMate_backend.Application.Common.Models
{
    public class Result<T>
    {
        public Result(bool succeeded, IEnumerable<string> errors)
        {
            Succeeded = succeeded;
            Errors = errors.ToArray();
        }

        public Result(bool succeeded, T response)
        {
            Succeeded = succeeded;
            Response = response;
        }

        public bool Succeeded { get; set; }

        public string[] Errors { get; set; }

        public T Response { get; set; }
    }
}
