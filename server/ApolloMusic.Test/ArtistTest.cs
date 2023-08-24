using ApolloMusic.Api.Controllers;
using ApolloMusic.Api.Service;
using ApolloMusic.Api.Models;
using ApolloMusic.Api.Utils;
using AutoFixture;
using Moq;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http;
using Castle.Core.Configuration;
using Microsoft.VisualStudio.TestPlatform.PlatformAbstractions.Interfaces;

namespace ApolloMusic.Test;


[TestClass]
public class ArtistTest
{
    private Mock<IUserRepository> _userRepository;
    private Fixture _fixture;
    private UserController? _controller;
    private LoginController? _loginController;
    private Mock<ICurrentRepository> _currentRepository;
    private Mock<ILoginRepository> _loginRepository;
    private Mock<IJwtRepository> _env;

    public ArtistTest()
    {
        _fixture = new Fixture();
        _userRepository = new Mock<IUserRepository>();
        _currentRepository = new Mock<ICurrentRepository>();
        _loginRepository = new Mock<ILoginRepository>();
        _env = new Mock<IJwtRepository>();
    }

    [TestMethod]
    public async Task UserSignUp()
    {
        var user = _fixture.Create<User>();
        user.Id = "64c911163a487b00cc2f36e6";
        _userRepository.Setup((x) => x.GetByIdAsync(user.Id)).Returns(Task.FromResult(user));

        _controller = new UserController(_userRepository.Object, _currentRepository.Object);

        var results = await _controller.GetUser(user.Id);


        Console.WriteLine($"User:{user}, Resutls:{results}");
        // Assert.AreEqual(user, resutls);

        Assert.IsInstanceOfType(results, typeof(OkObjectResult));



    }


    [TestMethod]
    public async Task LoginUser()
    {
        // Arrange
        var loginRepoMock = new Mock<ILoginRepository>();
        var user = new User { Id = "testuser" };
        loginRepoMock.Setup(repo => repo.LoginAsync(It.IsAny<LoginInPut>())).ReturnsAsync(user);


        var mockValue = "zv0bc83rNwLQ5q6FN2v5lLit1nGhxBM55nFDc5D1gZGvC9YFntQxyyEtxQzZxi1D";



        _env.Setup(repo => repo.GetEnvironmentVariable()).Returns(mockValue);


        var controller = new LoginController(loginRepoMock.Object, _env.Object);
        var context = new DefaultHttpContext();
        controller.ControllerContext = new ControllerContext { HttpContext = context };


        var loginInput = new LoginInPut { Username = "testuser", Password = "password" };

        // Act
        var result = await controller.Login(loginInput) as OkResult;

        //Assert
        var cookies = context.Response.Cookies;
        Assert.IsNotNull(result);
        Assert.AreEqual(StatusCodes.Status200OK, result.StatusCode);




    }






}
