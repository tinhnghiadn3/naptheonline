using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using NapTheOnline.Service;
using NapTheOnline.ViewModels;

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private List<UserModel> _users = new List<UserModel>
        {
            new UserModel { Id = 1, Username = "test", Password = "test" }
        };

        private UserService _userService;

        public AuthenticationController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public UserModel Login([FromBody]UserModel user)
        {
            return _userService.Authenticate(user.Username, user.Password);
        }
    }
}