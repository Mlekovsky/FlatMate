using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FlatMate_backend.Application.Common.Helpers
{
    public static class ListExtensions
    {
        public static IEnumerable<T> DistinctBy<T, TKey>(this IEnumerable<T> items, Func<T, TKey> property)
        {
            return items.GroupBy(property).Select(x => x.First());
        }
    }
}
