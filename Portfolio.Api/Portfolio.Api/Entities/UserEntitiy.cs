using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Portfolio.Api.Entities
{
    public class UserEntitiy
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; }
        public int? Age { get; set; } = 0;
        public string Description1 { get; set; }
        public string? Description2 { get; set; } = null;
        public string TechStack { get; set; }
        public string UniversityName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string GithubLink { get; set; }
        public string LinkednLink { get; set; }
        public string WPLink { get; set; }
        public string? CvPathTR { get; set; }
        public string? CvPathEN { get; set; }
    }
}
