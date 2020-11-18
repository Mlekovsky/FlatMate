using FlatMate_backend.Application.Common.Interfaces;
using System;

namespace FlatMate_backend.Infrastructure.Services
{
    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }
}
