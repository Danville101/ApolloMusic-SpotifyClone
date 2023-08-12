using System.Collections.Generic;
using ApolloMusic.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ApolloMusic.Api.Service
{
    public class ArtistRepository : IArtistRepository
    {


        private readonly IMongoCollection<Artist> _artistCollection;

        public ArtistRepository(IOptions<ApolloMusicDatabaseSetting> apolloMusicDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                apolloMusicDatabaseSetting.Value.ConnectionString
                );

            var mongoDatabase = mongoClient.GetDatabase(
                apolloMusicDatabaseSetting.Value.DatabaseName);

            _artistCollection = mongoDatabase.GetCollection<Artist>(
                apolloMusicDatabaseSetting.Value.ArtistCollectionName);
        }


        public async Task  CreateAsync(Artist newArtist){
        
            await _artistCollection.InsertOneAsync(newArtist);
        }

        public Task DeleteAsync(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<Artist?> GetByIdAsync(string id)
        {
          var artist=  await _artistCollection.Find(x=> x.Id == id).FirstOrDefaultAsync();

          return artist ;


        }

        public async Task<Artist?> GetByNameAsync(string name)
        {
          var artist=  await _artistCollection.Find(x=> x.Name == name).FirstOrDefaultAsync();

          return artist ;
        }

        public Task UpdateAsync(string id, Artist updatedArtist)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Artist>> GetAllAsync(){

           return  await _artistCollection.Find(_ => true).ToListAsync();

        }
    }
}