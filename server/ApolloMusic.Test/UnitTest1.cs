using ApolloMusic.Api.Controllers;
using ApolloMusic.Api.Service;
using ApolloMusic.Api.Models;
using AutoFixture;
using Moq;
using Microsoft.AspNetCore.Mvc;


namespace ApolloMusic.Test;


[TestClass]
public class UserTest
{
    private Mock<IUserRepository> _userRepository;
    private Fixture _fixture;
    private UserController? _controller;
    private Mock<ICurrentRepository> _currentRepository;

    public UserTest()
    {
        _fixture = new Fixture();
        _userRepository = new Mock<IUserRepository>();
        _currentRepository = new Mock<ICurrentRepository>();
    }

    [TestMethod]
    public async Task UserSignUp()
    {
        var user = _fixture.Create<User>();
        user.Id = "64c911163a487b00cc2f36e6";
        _userRepository.Setup((x) => x.GetByIdAsync(user.Id)).Returns(Task.FromResult(user));

        _controller = new UserController(_userRepository.Object , _currentRepository.Object);

        var results = await _controller.GetUser(user.Id);


        Console.WriteLine($"User:{user}, Resutls:{results}");
       // Assert.AreEqual(user, resutls);

        Assert.IsInstanceOfType(results, typeof(OkObjectResult));



    }






}
