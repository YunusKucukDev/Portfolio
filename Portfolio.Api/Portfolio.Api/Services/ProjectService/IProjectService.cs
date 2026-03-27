using Portfolio.Api.DTOs;

namespace Portfolio.Api.Services.ProjectService
{
    public interface IProjectService
    {
        Task<List<ProjectsDTO>> GetProjectAll();
        Task<ProjectsDTO> GetProject(string id);
        Task UpdateProjectDto(ProjectsDTO dto);
        Task CreateProjectService(CreateProjectsDTO dto);
        Task DeleteProjectService(string id);
    }
}
