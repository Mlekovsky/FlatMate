using FlatMate_backend.Application.Users.Queries.GetUserInfo;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace FlatMate_backend.WebUI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : ApiController
    {
        [HttpGet]
        [Route("UserInfo")]
        public async Task<ActionResult> GetUserInfo()
        {
            var request = new GetUserInfoQuery();
            request.SetUser(UserId);

            return Ok(await Mediator.Send(request));
        }
    }
}
