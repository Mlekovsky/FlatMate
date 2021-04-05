using AutoMapper;
using FlatMate_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Modules
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Module, ModuleInfoDTO>().ReverseMap();
            CreateMap<Module, ModuleInfoDTO>();
        }
    }
}

