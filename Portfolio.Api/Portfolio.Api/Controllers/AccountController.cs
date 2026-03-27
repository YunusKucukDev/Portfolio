
using Portfolio.Api.Entities; // AppUser ve AppRole burada olmalı
using Portfolio.Api.Services.IdentityService; // TokenService'in olduğu yer
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Api.DTOs;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserIdentityDTO>> Login(LoginDTO model)
    {
        // 1. Kullanıcıyı bul
        var user = await _userManager.FindByNameAsync(model.UserName);

        // 2. Kullanıcı var mı ve şifre doğru mu kontrol et
        if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return Unauthorized(new ProblemDetails { Title = "Kullanıcı adı veya şifre hatalı" });
        }

        // 3. Token oluştur ve kullanıcı bilgilerini dön
        return Ok(new UserIdentityDTO
        { 
            Token = await _tokenService.GenerateToken(user), 
            Name = user.Name 
        });
    }
 

    [Authorize]
    [HttpGet("getuser")]
    public async Task<ActionResult<UserIdentityDTO>> GetUser()
    {
        // Token'daki Name Claim'i üzerinden kullanıcıyı bulur
        var user = await _userManager.FindByNameAsync(User.Identity?.Name!);
        if (user == null) return NotFound();

        return Ok(new UserIdentityDTO
        { 
            Token = await _tokenService.GenerateToken(user), 
            Name = user.Name 
        });
    }
}