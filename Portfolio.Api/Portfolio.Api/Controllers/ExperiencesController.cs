using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.ExperinceService;

namespace Portfolio.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExperiencesController : ControllerBase
    {
        private readonly IExperinceService _service;

        public ExperiencesController(IExperinceService ExperinceService)
        {
            _service = ExperinceService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllExperinces()
        {
            var values = await _service.GetExperinceAll();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByIdExperince(string id)
        {
            var values = await _service.GetExperince(id);
            return Ok(values);
        }

        [HttpPost]
        public async Task<IActionResult> CreateExperince(CreateExperinceDTO createExperinceDto)
        {
            await _service.CreateExperinceService(createExperinceDto);
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateExperince(ExperinceDTO updateExperinceDto)
        {
            await _service.UpdateExperinceDto(updateExperinceDto);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExperince(string id)
        {
            await _service.DeleteExperinceService(id);
            return Ok();
        }
    }
}

