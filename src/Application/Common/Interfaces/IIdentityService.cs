using FlatMate_backend.Application.Common.Models;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<string> GetUserNameAsync(string userId);
    }
}
