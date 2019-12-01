using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using NapTheOnline.Models;
using NapTheOnline.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NapTheOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
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

        //[Authorize]
        //[HttpGet("user/{id}")]
        //public User GetUser([FromRoute]int id)
        //{
        //    return _userService.Get(id);
        //}
    }
}
