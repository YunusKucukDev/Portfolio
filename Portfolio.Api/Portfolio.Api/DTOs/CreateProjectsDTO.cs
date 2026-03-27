namespace Portfolio.Api.DTOs
{
    public class CreateProjectsDTO
    {
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
