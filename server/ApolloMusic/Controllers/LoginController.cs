using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ApolloMusic.Api.Models;
using ApolloMusic.Api.Service;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using DotNetEnv;
using System.Diagnostics;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApolloMusic.Api.Controllers

{

    [ApiController]
    [Route("api/[controller]")]

    public class LoginController : Controller
    {

        private ILoginRepository _loginRepo;
      

        private readonly string? _secretKey = Environment.GetEnvironmentVariable("MY_SECERT");
        public LoginController(ILoginRepository loginRepository)
        {  Env.Load();
            _loginRepo = loginRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginInPut loginInPut)
        {
            var user = await _loginRepo.LoginAsync(loginInPut);
            if (user is not null)
            {
                // user.Id
                var tokenString = CreateToken(user);
                Response.Cookies.Append("access_token_AppolloMusic", tokenString, new CookieOptions
                {
                    HttpOnly = true,
                    Expires = DateTime.UtcNow.AddDays(1) // Set the cookie expiration time to match the token expiration.
                });

                Response.Cookies.Append("Logged_In", "true", new CookieOptions
                {
                    Expires = DateTime.UtcNow.AddDays(1) // Set the cookie expiration time to match the token expiration.
                });
                return Ok();

            }
            else
            {
                return BadRequest();
            }

        }


        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Id),
                new Claim(ClaimTypes.Role, "Admin"),
                new Claim(ClaimTypes.Role, "User"),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

             [Route("/api/logout")]
             [HttpPost]
        public IActionResult Logout(){
            
            if (Request.Cookies["access_token_AppolloMusic"] != null)
{

  
  Response.Cookies.Append("access_token_AppolloMusic", "", new CookieOptions
                {
                    HttpOnly = true,
                    Expires =  DateTime.Now.AddDays(-1) // Set the cookie expiration time to match the token expiration.
                });

            
                Response.Cookies.Append("Logged_In", "", new CookieOptions
                {
                    Expires =  DateTime.Now.AddDays(-1) // Set the cookie expiration time to match the token expiration.
                });
                


        }

        return Ok("Logged out");
     
    }


   

        




    }


}