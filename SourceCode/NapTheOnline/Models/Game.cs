using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NapTheOnline.Models
{
    public class Game
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public string logo { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string banner { get; set; }
        public List<Image> images { get; set; }
        public List<Price> prices { get; set; }
        public string currency { get; set; }
    }
}
