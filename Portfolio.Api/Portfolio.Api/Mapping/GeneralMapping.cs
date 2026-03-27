using AutoMapper;
using Portfolio.Api.DTOs;
using Portfolio.Api.Entities;

namespace Portfolio.Api.Mapping
{
    public class GeneralMapping : Profile
    {
        public GeneralMapping()
        {
            CreateMap<Project, CreateProjectsDTO>().ReverseMap();
            CreateMap<Project, ProjectsDTO>().ReverseMap();
            CreateMap<Experience, CreateExperinceDTO>().ReverseMap();
            CreateMap<Experience, ExperinceDTO>().ReverseMap();
            CreateMap<UserEntitiy, UserEntityDTO>().ReverseMap();
            CreateMap<UserEntitiy, CreateUserDto>().ReverseMap();
        }
    }
}
