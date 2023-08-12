using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApolloMusic.Api.Service;
using ApolloMusic.Api.Models;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApolloMusic.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class UserController : Controller
    {

        private readonly IUserRepository _userRepo;

        private readonly ICurrentRepository _currentRepository;



        public UserController(IUserRepository userRepository, ICurrentRepository currentRepository)
        {
            _userRepo = userRepository;
            _currentRepository = currentRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _userRepo.GetByIdAsync(id);

            return Ok(user);
        }


        [HttpPost]
        public async Task<IActionResult> CreateUser( UserRquestInPut newUser) {

            var user = newUser;
            var existUser = await _userRepo.GetByEmailAsync(newUser.Email);

            if (newUser.Password == newUser.Password2 && existUser is null)
            {
                
          
                user.Password = HashPassword(newUser.Password);

                await  _userRepo.CreateAsync(user);
            }

            var createdUser = await _userRepo.GetByEmailAsync(newUser.Email);

            //createdUser.Id

            var current = new Current { UserId = createdUser.Id, Tracks = new List<Track>() };

            await _currentRepository.CreateAsync(current);


            return Ok("Created");


        }

        private string HashPassword(string password)
        {
            // Generate a salt and hash the password using bcrypt
            string salt = BCrypt.Net.BCrypt.GenerateSalt();
            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password, salt);
            return hashedPassword;
        }


    }
}

