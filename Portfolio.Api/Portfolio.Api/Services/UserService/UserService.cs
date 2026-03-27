using AutoMapper;
using MongoDB.Driver;
using Portfolio.Api.DTOs;
using Portfolio.Api.Entities;
using Portfolio.Api.Settings;

namespace Portfolio.Api.Services.UserService
{
    public class UserService : IUserService
    {

        private readonly IMongoCollection<UserEntitiy> _collection;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _env;

        public UserService(IMapper mapper, IDatabaseSettings _databaseSettings, IWebHostEnvironment env)
        {
            var client = new MongoClient(_databaseSettings.ConnectionString);
            var database = client.GetDatabase(_databaseSettings.DatabaseName);
            _collection = database.GetCollection<UserEntitiy>(_databaseSettings.UserCollectionName);
            _mapper = mapper;
            _env = env;
        }

        public async Task CreateUserInformationService(CreateUserDto dto)
        {
            if (dto.CvFileTr != null)
                dto.CvPathTR = await SaveCvFile(dto.CvFileTr, "tr");

            if (dto.CvFileEn != null)
                dto.CvPathEN = await SaveCvFile(dto.CvFileEn, "en");

            var entity = _mapper.Map<UserEntitiy>(dto);
            await _collection.InsertOneAsync(entity);
        }

        public async Task<List<UserEntityDTO>> GetAllUserInformation()
        {
            var values = await _collection.Find(user => true).ToListAsync();
            return _mapper.Map<List<UserEntityDTO>>(values);
        }

        public async Task<UserEntityDTO> GetUserInformationService(string id)
        {
            var values = await _collection.Find(user => user.Id == id).ToListAsync();
            return _mapper.Map<UserEntityDTO>(values);
        }

        public async Task UpdateUserInformationService(UserEntityDTO dto)
        {
            // 1. Yeni dosyalar geldiyse onları kaydet ve DTO'daki path alanlarını güncelle
            if (dto.CvFileTr != null)
            {
                dto.CvPathTR = await SaveCvFile(dto.CvFileTr, "tr");
            }

            if (dto.CvFileEn != null)
            {
                dto.CvPathEN = await SaveCvFile(dto.CvFileEn, "en");
            }

            // 2. Mevcut veriyi bul (Eğer yeni dosya yüklenmediyse eski path'ler kaybolmasın diye)
            var existingUser = await _collection.Find(x => x.Id == dto.Id).FirstOrDefaultAsync();

            // Eğer yeni dosya seçilmediyse, veritabanındaki eski dosya yolunu koru
            if (dto.CvFileTr == null) dto.CvPathTR = existingUser?.CvPathTR;
            if (dto.CvFileEn == null) dto.CvPathEN = existingUser?.CvPathEN;

            // 3. Entity'ye Map et ve MongoDB'de güncelle
            var entity = _mapper.Map<UserEntitiy>(dto);

            await _collection.FindOneAndReplaceAsync<UserEntitiy>(
                x => x.Id == dto.Id,
                entity
            );
        }

        // Dosya Kaydetme Yardımcı Metodu
        private async Task<string> SaveCvFile(IFormFile file, string lang)
        {
            // Klasör yolu: wwwroot/uploads/cvs
            string folderPath = Path.Combine(_env.WebRootPath, "uploads", "cvs");

            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            // Benzersiz dosya ismi oluştur
            string fileName = $"cv_{lang}_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            string fullPath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // DB'ye kaydedilecek web yolu
            return $"/uploads/cvs/{fileName}";
        }
    }
}

