using AutoMapper;
using FlatMate_backend.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Apartaments
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Apartament, ApartamentDTO>().ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.ShortName)).ReverseMap();
            CreateMap<Apartament, ApartamentDTO>().ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.ShortName));
        }
    }
}
