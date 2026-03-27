using Portfolio.Api.DTOs;
using Portfolio.Api.Entities;

namespace Portfolio.Api.Services.UserService
{
    public interface IUserService
    {
        Task<List<UserEntityDTO>> GetAllUserInformation();
        Task<UserEntityDTO> GetUserInformationService(string id);
        Task UpdateUserInformationService(UserEntityDTO dto);
        Task CreateUserInformationService(CreateUserDto dto);
    }
}
