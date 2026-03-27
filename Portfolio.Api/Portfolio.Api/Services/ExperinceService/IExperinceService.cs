using Portfolio.Api.DTOs;
using System.Collections.Specialized;

namespace Portfolio.Api.Services.ExperinceService
{
    public interface IExperinceService
    {
        Task<List<ExperinceDTO>> GetExperinceAll();
        Task<ExperinceDTO> GetExperince(string id);
        Task UpdateExperinceDto(ExperinceDTO dto);
        Task CreateExperinceService(CreateExperinceDTO dto);
        Task DeleteExperinceService(string id);
    }
}
