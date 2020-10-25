using MongoDB.Bson.Serialization.Attributes;

namespace dot.net_core.Models
{
    [BsonIgnoreExtraElements]
    public class Candidate
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("course")]
        public string Course { get; set; }
    }
}
