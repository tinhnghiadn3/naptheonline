using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

using NapTheOnline.Models;
using NapTheOnline.Utilities;

namespace NapTheOnline.Services
{
    public class UserService
    {
        private readonly AppSettings _appSettings;

        private List<User> _users = new List<User>
        {
            new User { Id = 1, Username = "pikachu@pikachu.com", Password = "Pikachu936" }
        };

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public User Authenticate(string username, string password)
        {
            var user = _users.SingleOrDefault(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var random = new Random();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(AppClaims.UserId, random.Next(0, 96).ToString()),
                    new Claim(AppClaims.UserName, user.Username),
                    new Claim(AppClaims.Password, user.Username),
                    new Claim(AppClaims.NCOL, "NCOL")
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }
    }
}
