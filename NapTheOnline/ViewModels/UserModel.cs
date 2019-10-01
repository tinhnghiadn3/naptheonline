using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NapTheOnline.ViewModels
{
    public class UserModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}
