namespace Portfolio.Api.DTOs
{
    public class CreateExperinceDTO
    {
        public string ExperienceCompanyName { get; set; }
        public string ExperinceMyTitle { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
