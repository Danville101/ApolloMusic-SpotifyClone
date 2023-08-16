using Microsoft.AspNetCore.Mvc;
using ApolloMusic.Api.Service;
using ApolloMusic.Api.Models;
using ApolloMusic.Service;
using ApolloMusic.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;


namespace ApolloMusic.Api.Controllers
{  

    [ApiController]
    [Route("api/[controller]")]
    public class CurrentController: ControllerBase
    {
        private readonly ICurrentRepository _currentRepository;


        public CurrentController(ICurrentRepository CurrentRepository){
            _currentRepository = CurrentRepository;
        }


     

        [HttpPut]
        public async Task<IActionResult>  UpdateCurrent(CurrentUpdateRequesInput  updateCurrent){
          // Note User cant pass Id this has to come from http only cookie


   
          var id = GetUserId();

          await _currentRepository.UpdateAsync( id, updateCurrent);

          return Ok("updated");

        }


         [HttpGet]

        public async Task<IActionResult> GetCurrent(){
          // Note User cant pass Id this has to come from http only cookie

           var id = GetUserId();

          var current = await _currentRepository.GetByUserIdAsync(id);

          return Ok(current);
        }



      private string? GetUserId(){
            string jwtCookieValue = Request.Cookies["access_token_AppolloMusic"];

    var jwtHandler = new JwtSecurityTokenHandler();
    var token = jwtHandler.ReadJwtToken(jwtCookieValue);


    // For specific claims, you can access them by their type
    var userId = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

    return  userId;

      }

        
    }
}