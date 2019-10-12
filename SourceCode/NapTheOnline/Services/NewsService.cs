using System;
using System.Collections.Generic;
using MongoDB.Driver;
using NapTheOnline.Models;

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

        public List<News> Get() => _news.Find(news => true).ToList();

        public News Get(string id) => _news.Find<News>(news => news.Id == id).FirstOrDefault();

        public News Create(News news)
        {
            _news.InsertOne(news);
            return news;
        }

        public void Update(string id, News newsIn) => _news.ReplaceOne(news => news.Id == id, newsIn);

        public void Remove(News newsIn) => _news.DeleteOne(news => news.Id == newsIn.Id);

        public void Remove(string id) => _news.DeleteOne(news => news.Id == id);
    }
}
