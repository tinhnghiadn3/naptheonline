using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NapTheOnline.Models
{
    public class News
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public string logo { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string datecreated { get; set; }
        public int typeid { get; set; }
        public List<Image> images { get; set; }
    }
}
