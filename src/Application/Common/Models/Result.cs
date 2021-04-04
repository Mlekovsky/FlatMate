using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace FlatMate_backend.Application.Common.Models
{
    public class Result<T>
    {
        public Result(bool succeeded, IEnumerable<string> errors)
        {
            Succeeded = succeeded;
            Errors = errors.ToArray();
            StatusCode = HttpStatusCode.BadRequest;
        }

        public Result(bool succeeded, T response)
        {
            Succeeded = succeeded;
            Response = response;
            StatusCode = HttpStatusCode.OK;
        }

        public void SetStatusCode(HttpStatusCode statusCode)
        {
            StatusCode = statusCode;
        }

        public bool Succeeded { get; set; }

        public string[] Errors { get; set; }

        public T Response { get; set; }

        public HttpStatusCode StatusCode { get; set; }
    }
}
