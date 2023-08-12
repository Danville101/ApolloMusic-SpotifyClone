using System;
using ApolloMusic.Api.Models;
namespace ApolloMusic.Api.Service
{
	public interface ICurrentRepository
	{

		Task<Current?> GetByUserIdAsync(string id);

		Task<List<Current>>   GetCurrents();

	

		Task CreateAsync(Current newCurrent);

		Task DeleteAsync(string id);

		Task UpdateAsync(string id, CurrentUpdateRequesInput updatedCurrent);
        Task CreateAsync(string? id);
     
    }
}

