using System.Collections.Generic;
using System.Linq;
using System.Text;
using MongoDB.Driver;
using NapTheOnline.Models;
using NapTheOnline.ViewModels;

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

        public ListResultViewModel<List<GameModel>> GetGame(int pageIndex)
        {
            int pageCount = (int)_games.CountDocuments(game => true);
            if (pageIndex == -1)
            {
                var games = _games.Find(game => true).ToList().Select(_ => new GameModel
                {
                    id = _.id,
                    logo = _.logo,
                    name = _.name,
                    friendlyname = _.friendlyname,
                    description = _.description,
                    banner = _.banner,
                    prices = _.prices,
                    currency = _.currency,
                }).ToList(); 
                return new ListResultViewModel<List<GameModel>>(games, pageCount);
            }
            else
            {
                var take = 20;
                var skip = (pageIndex) * take;
                var games = _games.Find(game => true).Skip(skip).Limit(take).ToList().Select(_ => new GameModel
                {
                    id = _.id,
                    logo = _.logo,
                    name = _.name,
                    friendlyname = _.friendlyname,
                    description = _.description,
                    banner = _.banner,
                    prices = _.prices,
                    currency = _.currency,
                }).ToList();
                return new ListResultViewModel<List<GameModel>>(games, pageCount);
            }
        }

        public Game Get(string id) => _games.Find<Game>(game => game.id == id).FirstOrDefault();

        public Game GetByFriendlyName(string friendlyname) => _games.Find<Game>(game => game.friendlyname == friendlyname).FirstOrDefault();

        public Game Create(Game game)
        {
            game.friendlyname = RemoveSpecialCharacters(game.friendlyname);
            game.friendlyname = UniqueFriendlyName(game.friendlyname);
            _games.InsertOne(game);
            return game;
        }

        public void Update(string id, Game gameIn) => _games.ReplaceOne(game => game.id == id, gameIn);

        public void Remove(Game gameIn) => _games.DeleteOne(game => game.id == gameIn.id);

        public void Remove(string id) => _games.DeleteOne(game => game.id == id);

        public string RemoveSpecialCharacters(string str)
        {
            var sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || c == '-')
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }

        public string UniqueFriendlyName(string str)
        {
            var games = _games.Find(game => true).ToList();
            var newfriendlyName = str;
            var i = 1;
            while (games.Any(_ => _.friendlyname == newfriendlyName))
            {
                newfriendlyName = newfriendlyName + "-" + i;
                i++;
            }

            return newfriendlyName;
        }
    }
}