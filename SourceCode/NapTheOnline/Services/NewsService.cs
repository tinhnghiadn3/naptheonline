using System.Collections.Generic;
using System.Linq;
using System.Text;
using MongoDB.Driver;
using NapTheOnline.Models;
using NapTheOnline.ViewModels;

namespace NapTheOnline.Services
{
    public class NewsService
    {
        private readonly IMongoCollection<News> _news;

        public NewsService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.Database);

            _news = database.GetCollection<News>("News");
        }

        public ListResultViewModel<List<NewsModel>> Get(int typeId, int pageIndex)
        {
            int pageCount = (int)_news.CountDocuments(news => true);
            if (pageIndex == -1)
            {
                if (typeId == 0)
                {
                    var listNews = _news.Find(news => true).ToList().Select(_ => new NewsModel
                    {
                        id = _.id,
                        logo = _.logo,
                        name = _.name,
                        friendlyname = _.friendlyname,
                        description = _.description,
                        datecreated = _.datecreated,
                        typeid = _.typeid,
                    }).ToList();
                    return new ListResultViewModel<List<NewsModel>>(listNews, pageCount);
                }
                else
                {
                    var listNews = _news.Find(news => true && news.typeid == typeId).ToList().Select(_ => new NewsModel
                    {
                        id = _.id,
                        logo = _.logo,
                        name = _.name,
                        friendlyname = _.friendlyname,
                        description = _.description,
                        datecreated = _.datecreated,
                        typeid = _.typeid,
                    }).ToList();
                    return new ListResultViewModel<List<NewsModel>>(listNews, pageCount);
                }
            }
            else
            {
                var take = 20;
                var skip = (pageIndex) * take;
                if (typeId == 0)
                {
                    var listNews = _news.Find(news => true).Skip(skip).Limit(take).ToList().Select(_ => new NewsModel
                    {
                        id = _.id,
                        logo = _.logo,
                        name = _.name,
                        friendlyname = _.friendlyname,
                        description = _.description,
                        datecreated = _.datecreated,
                        typeid = _.typeid,
                    }).ToList();
                    return new ListResultViewModel<List<NewsModel>>(listNews, pageCount);
                }
                else
                {
                    var listNews = _news.Find(news => true && news.typeid == typeId).Skip(skip).Limit(take).ToList().Select(_ => new NewsModel
                    {
                        id = _.id,
                        logo = _.logo,
                        name = _.name,
                        friendlyname = _.friendlyname,
                        description = _.description,
                        datecreated = _.datecreated,
                        typeid = _.typeid,
                    }).ToList();
                    return new ListResultViewModel<List<NewsModel>>(listNews, pageCount);
                }
            }
        }

        public News Get(string id) => _news.Find<News>(news => news.id == id).FirstOrDefault();

        public News GetByFriendlyName(string friendlyname) => _news.Find<News>(news => news.friendlyname == friendlyname).FirstOrDefault();

        public News Create(News news)
        {
            news.friendlyname = RemoveSpecialCharacters(news.friendlyname);
            news.friendlyname = UniqueFriendlyName(news.friendlyname);
            _news.InsertOne(news);
            return news;
        }

        public void Update(string id, News newsIn) => _news.ReplaceOne(news => news.id == id, newsIn);

        public void Remove(News newsIn) => _news.DeleteOne(news => news.id == newsIn.id);

        public void Remove(string id) => _news.DeleteOne(news => news.id == id);

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
            var news = _news.Find(news => true).ToList();
            var newfriendlyName = str;
            var i = 1;
            while (news.Any(_ => _.friendlyname == newfriendlyName))
            {
                newfriendlyName = newfriendlyName + "-" + i;
                i++;
            }

            return newfriendlyName;
        }
    }
}
