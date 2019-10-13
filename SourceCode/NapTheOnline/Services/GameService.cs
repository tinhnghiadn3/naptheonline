using System;
using System.Collections.Generic;
using MongoDB.Driver;
using NapTheOnline.Models;

namespace NapTheOnline.Services
{
    public class GameService
    {
        private readonly IMongoCollection<Game> _games;

        public GameService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.Database);

            _games = database.GetCollection<Game>("Game");
        }

        public ListResult<List<Game>> GetGame(int pageIndex)
        {
            int pageCount = (int)_games.CountDocuments(game => true);
            if (pageIndex == 0)
            {
                return new ListResult<List<Game>>(_games.Find(game => true).ToList(), pageCount);
            }
            else
            {
                var take = 5;
                var skip = (pageIndex - 1) * take;
                return new ListResult<List<Game>>(_games.Find(game => true).Skip(skip).Limit(take).ToList(), pageCount);
            }
        }

        public Game Get(string id) => _games.Find<Game>(game => game.id == id).FirstOrDefault();

        public Game Create(Game game)
        {
            _games.InsertOne(game);
            return game;
        }

        public void Update(string id, Game gameIn) => _games.ReplaceOne(game => game.id == id, gameIn);

        public void Remove(Game gameIn) => _games.DeleteOne(game => game.id == gameIn.id);

        public void Remove(string id) => _games.DeleteOne(game => game.id == id);
    }
}