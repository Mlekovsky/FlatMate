using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace FlatMate_backend.Application.Common.Models
{
    public abstract class BaseRequest
    {
        protected int UserId { get; set; }

        public void SetUser(int id)
        {
            UserId = id;
        }

        public int GetUser()
        {
            return UserId;
        }
    }
}
