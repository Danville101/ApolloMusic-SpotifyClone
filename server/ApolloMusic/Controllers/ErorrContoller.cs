using System.Security.Authentication.ExtendedProtection;
using System;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using ApolloMusic.Api.Service;
using ApolloMusic.Api.Models;
using Microsoft.AspNetCore.Diagnostics;

namespace ApolloMusic.Controllers
{  

    [ApiController]
        [Route("api/errors")]
    public class ErrorsContoller: ControllerBase
    {

        public IActionResult Error(){


            Exception? exception = HttpContext.Features.Get<IExceptionHandlerFeature>().Error;

            return Problem(title:exception.Message);
        }
        
    }
}