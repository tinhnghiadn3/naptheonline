using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using NapTheOnline.Models;
using System.Collections.Generic;

namespace NapTheOnline.ViewModels
{
    public class GameModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public string logo { get; set; }
        public string name { get; set; }
        public string friendlyname { get; set; }
        public string description { get; set; }
        public string banner { get; set; }
        public List<Price> prices { get; set; }
        public string currency { get; set; }
    }
}
