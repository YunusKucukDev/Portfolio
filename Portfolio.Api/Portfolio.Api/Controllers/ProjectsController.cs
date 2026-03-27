using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.ProjectService;


namespace Portfolio.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _service;

        public ProjectsController(IProjectService ProjectsService)
        {
            _service = ProjectsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProjects()
        {
            var values = await _service.GetProjectAll();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdProjects(string id)
        {
            var values = await _service.GetProject(id);
            return Ok(values);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProjects(CreateProjectsDTO createProjectsDto)
        {
            await _service.CreateProjectService(createProjectsDto);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProjects(ProjectsDTO updateProjectsDto)
        {
            await _service.UpdateProjectDto(updateProjectsDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjects(string id)
        {
            await _service.DeleteProjectService(id);
            return Ok();
        }

    }
}
