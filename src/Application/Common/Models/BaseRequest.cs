using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace FlatMate_backend.Application.Common.Models
{
    public abstract class BaseRequest
    {  
        [JsonIgnore]
        public int UserId { get; set; }
    }
}
