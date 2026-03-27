using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs;
using Portfolio.Api.Services.UserService;
using System.Globalization;


namespace Portfolio.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserInformation()
        {
            var result = await _userService.GetAllUserInformation();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserInformation(string id)
        {
            var result = await _userService.GetUserInformationService(id);
            return Ok(result);
        }

        [HttpPut("UpdateUserInformation")]
        // [FromForm] eklemezsen dosyalar (CvFileTr, CvFileEn) her zaman null gelir!
        public async Task<IActionResult> UpdateUserInformation([FromForm] UserEntityDTO dto)
        {
            await _userService.UpdateUserInformationService(dto);
            return Ok("Başarılı");
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserInformation([FromForm] CreateUserDto dto)
        {
            await _userService.CreateUserInformationService(dto);
            return Ok("Başarıyla oluşturuldu.");
        }
    }
}
