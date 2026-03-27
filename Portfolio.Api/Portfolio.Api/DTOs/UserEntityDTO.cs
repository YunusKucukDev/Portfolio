namespace Portfolio.Api.DTOs
{
    public class UserEntityDTO
    {
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
        public IFormFile? CvFileTr { get; set; }
        public IFormFile? CvFileEn { get; set; }

        // Veritabanında saklanacak string yollar
        public string? CvPathTR { get; set; }
        public string? CvPathEN { get; set; }
    }
}

