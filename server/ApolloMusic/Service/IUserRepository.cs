using System;
using ApolloMusic.Api.Models;
namespace ApolloMusic.Api.Service
{
	public interface IUserRepository
	{

		Task<User?> GetByIdAsync(string id);

		Task<User?> GetByEmailAsync(string email);

		Task CreateAsync(UserRquestInPut newUser);

		Task DeleteAsync(string id);

		Task UpdateAsync(string id, User updatedUser);


	}
}

