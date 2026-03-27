using AutoMapper;
using MongoDB.Driver;
using Portfolio.Api.DTOs;
using Portfolio.Api.Entities;
using Portfolio.Api.Settings;

namespace Portfolio.Api.Services.ProjectService
{
    public class ProjectService : IProjectService
    {

        private readonly IMongoCollection<Project> _collection;
        private readonly IMapper _mapper;

        public ProjectService(IMapper mapper, IDatabaseSettings _databaseSettings)
        {
            var client = new MongoClient(_databaseSettings.ConnectionString);
            var database = client.GetDatabase(_databaseSettings.DatabaseName);
            _collection = database.GetCollection<Project>(_databaseSettings.ProjectCollectionName);
            _mapper = mapper;

        }

        public async Task<ProjectsDTO> GetProject(string id)
        {
            var values = await _collection.FindAsync(x => x.Id == id);
            var projectList = await values.ToListAsync();
            var project = projectList.FirstOrDefault();
            return _mapper.Map<ProjectsDTO>(project);
        }

        public async Task<List<ProjectsDTO>> GetProjectAll()
        {
            var values = await _collection.Find(x => true).ToListAsync();
            return _mapper.Map<List<ProjectsDTO>>(values);
        }

        public async Task CreateProjectService(CreateProjectsDTO dto)
        {
            await _collection.InsertOneAsync(_mapper.Map<Project>(dto));
        }

        public async Task DeleteProjectService(string id)
        {
            await _collection.DeleteOneAsync(x => x.Id == id);
        }

        public async Task UpdateProjectDto(ProjectsDTO dto)
        {
            await _collection.FindOneAndReplaceAsync(x => x.Id == dto.Id, _mapper.Map<Project>(dto));
        }
    }
}
