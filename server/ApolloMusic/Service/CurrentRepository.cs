
using System.Collections.Generic;
using ApolloMusic.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;


namespace ApolloMusic.Api.Service
{
    public class CurrentRepository : ICurrentRepository
    {

         private readonly IMongoCollection<Current> _currentCollection;

        public CurrentRepository(IOptions<ApolloMusicDatabaseSetting> apolloMusicDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                apolloMusicDatabaseSetting.Value.ConnectionString
                );

            var mongoDatabase = mongoClient.GetDatabase(
                apolloMusicDatabaseSetting.Value.DatabaseName);

            _currentCollection = mongoDatabase.GetCollection<Current>(
                apolloMusicDatabaseSetting.Value.CurrentCollectionName);
        }

        public async Task CreateAsync(Current newCurrent)
        {
           await _currentCollection.InsertOneAsync(newCurrent);
        }

        public Task CreateAsync(string? id)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }
       
        public async Task<Current?> GetByUserIdAsync(string id)
        {
            return await _currentCollection.Find(x => x.UserId == id).FirstOrDefaultAsync();
        }

        public async Task<List<Current>> GetCurrents()
        {
        return  await _currentCollection.Find(_ => true).ToListAsync();
        }

        public async Task UpdateAsync(string id, CurrentUpdateRequesInput updatedCurrentInput)
        {
           var current = await _currentCollection.Find(x => x.UserId == id).FirstOrDefaultAsync();

            var updateCurrent = new Current { Id = current.Id, CreatedDate = current.CreatedDate, Tracks = updatedCurrentInput.Tracks , UserId= current.UserId};
           await _currentCollection.ReplaceOneAsync(x => x.UserId == id, updateCurrent);
            
        }

       
    }
    
}