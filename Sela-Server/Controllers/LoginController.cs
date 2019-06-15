namespace Sela_Server.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Sela_Server.Core;
    using System.Threading.Tasks;

    /// <summary>
    /// Authentication controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        /// <summary>
        /// Action to authenticate user by provided <paramref name="loginRequest"/>
        /// </summary>
        /// <param name="loginRequest"></param>
        /// <returns>It always return successful result as a <see cref="LoginStatus"/> object</returns>
        [HttpPost]
        public Task<JsonResult> Get([FromBody] LoginRequest loginRequest)
        {
            return Task.FromResult(new JsonResult(LoginStatus.LoginSuccess));
        }
    }
}
