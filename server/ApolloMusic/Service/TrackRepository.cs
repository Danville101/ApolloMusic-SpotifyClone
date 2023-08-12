using ApolloMusic.Api.Models;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ApolloMusic.Service
{
    public class TrackRepository : ITrackRepository
    {


        private readonly IMongoCollection<Track> _trackCollection;

        public TrackRepository(IOptions<ApolloMusicDatabaseSetting> apolloMusicDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                apolloMusicDatabaseSetting.Value.ConnectionString
                );

            var mongoDatabase = mongoClient.GetDatabase(
                apolloMusicDatabaseSetting.Value.DatabaseName);

            _trackCollection = mongoDatabase.GetCollection<Track>(
                apolloMusicDatabaseSetting.Value.TrackCollectionName);
        }



        public async Task CreateTrackAsync(Track track)
        {

            await _trackCollection.InsertOneAsync(track);
        }


        public async   Task<List<Track>> GetTracks()=>
        
            await _trackCollection.Find(_ => true).ToListAsync();


          public async  Task<List<Track>> GetTracksByGenre(string genre){

         return  await _trackCollection.Find(x=>x.Genre == genre).ToListAsync();
      }
}   
    }

     