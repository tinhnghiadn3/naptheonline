using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NapTheOnline.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}
