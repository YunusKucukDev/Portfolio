namespace Portfolio.Api.Settings
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }

        public string UserCollectionName { get; set; }
        public string ProjectCollectionName { get; set; }
        public string ExperienceCollectionName { get; set; }

        public string UsersIdentityCollectionName { get; set; } // Identity kullanıcıları için (Örn: "IdentityUsers")
        public string RolesIdentityCollectionName { get; set; } // Identity rolleri için (Örn: "IdentityRoles")
    }
}

