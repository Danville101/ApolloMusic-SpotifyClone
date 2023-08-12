using System;
using ApolloMusic.Api.Models;
namespace ApolloMusic.Api.Service
{
	public interface ILoginRepository
	{
		Task<User?> LoginAsync(LoginInPut loginInPut);
	}
}

