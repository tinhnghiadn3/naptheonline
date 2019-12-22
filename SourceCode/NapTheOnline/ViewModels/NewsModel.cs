
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace NapTheOnline.ViewModels
{
    public class NewsModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string id { get; set; }
        public string logo { get; set; }
        public string name { get; set; }
        public string friendlyname { get; set; }
        public string description { get; set; }
        public string datecreated { get; set; }
        public int typeid { get; set; }
    }
}
