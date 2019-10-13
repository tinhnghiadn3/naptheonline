using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NapTheOnline.Models
{
    public class News
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Logo { get; set; }
        public string Name { get; set; }
        public string DateCreated { get; set; }
        public int TypeId { get; set; }
    }
}
