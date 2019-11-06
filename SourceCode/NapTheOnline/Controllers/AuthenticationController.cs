using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NapTheOnline.Models;
using NapTheOnline.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private List<User> _users = new List<User>
        {
            new User { Id = 1, Username = "test", Password = "test" }
        };

        private UserService _userService;

        public AuthenticationController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public User Login([FromBody]User user)
        {
            return _userService.Authenticate(user.Username, user.Password);
        }
    }
}
