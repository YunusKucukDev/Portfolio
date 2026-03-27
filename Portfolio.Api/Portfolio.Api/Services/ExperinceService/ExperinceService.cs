using AutoMapper;
using MongoDB.Driver;
using Portfolio.Api.DTOs;
using Portfolio.Api.Entities;
using Portfolio.Api.Settings;

namespace Portfolio.Api.Services.ExperinceService
{
    public class ExperinceService : IExperinceService
    {
        private readonly IMongoCollection<Experience> _collection;
        private readonly IMapper _mapper;

        public ExperinceService(IMapper mapper, IDatabaseSettings _databaseSettings)
        {
            var client = new MongoClient(_databaseSettings.ConnectionString);
            var database = client.GetDatabase(_databaseSettings.DatabaseName);
            _collection = database.GetCollection<Experience>(_databaseSettings.ExperienceCollectionName);
            _mapper = mapper;
        }

        public async Task<ExperinceDTO> GetExperince(string id)
        {
            var values = await _collection.Find(user => user.Id == id).ToListAsync();
            return _mapper.Map<ExperinceDTO>(values);
        }

        public async Task<List<ExperinceDTO>> GetExperinceAll()
        {
            var values = await _collection.Find(user => true).ToListAsync();
            return _mapper.Map<List<ExperinceDTO>>(values);
        }

        public  async Task CreateExperinceService(CreateExperinceDTO dto)
        {
            await _collection.InsertOneAsync(_mapper.Map<Experience>(dto));
        }

        public async Task DeleteExperinceService(string id)
        {
            await _collection.DeleteOneAsync(x => x.Id == id);
        }

        public async Task UpdateExperinceDto(ExperinceDTO dto)
        {
            await _collection.FindOneAndReplaceAsync(x => x.Id == dto.Id, _mapper.Map<Experience>(dto));
        }
    }
}
