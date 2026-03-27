using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Portfolio.Api.Entities
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
        public string projectImage1 { get; set; }
        public string? projectImage2 { get; set; }
        public string? projectImage3 { get; set; }
        public string? projectImage4 { get; set; }
        public string? projectImage5 { get; set; }
        public string ProjcetTechStack { get; set; }
        public string ProjectLink { get; set; }

    }
}
