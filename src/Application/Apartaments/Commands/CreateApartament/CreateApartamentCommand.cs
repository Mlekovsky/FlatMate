using AutoMapper;
using FlatMate_backend.Application.Common.Helpers;
using FlatMate_backend.Application.Common.Interfaces;
using FlatMate_backend.Application.Common.Models;
using FlatMate_backend.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Apartaments.Commands.CreateApartament
{
    public class CreateApartamentCommand : BaseRequest, IRequest<Result<ApartamentModulesDTO>>
    {
        public string ShortName { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
    }

    public class CreateApartamentCommandHandler : IRequestHandler<CreateApartamentCommand, Result<ApartamentModulesDTO>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IPasswordEncryptorService _passwordService;
        private readonly PasswordSettings _secretKeySettings;

        public CreateApartamentCommandHandler(IApplicationDbContext context,
            IMapper mapper,
            IPasswordEncryptorService passwordEncryptorService,
            PasswordSettings passwordSettings)
        {
            _context = context;
            _mapper = mapper;
            _passwordService = passwordEncryptorService;
            _secretKeySettings = passwordSettings;
        }

        public async Task<Result<ApartamentModulesDTO>> Handle(CreateApartamentCommand request, CancellationToken cancellationToken)
        {
            var errors = new List<string>();
            try
            {
                var user = _context.Users.FirstOrDefault(x => x.Id == request.UserId);

                if (user == null)
                {
                    errors.Add("User does not exist in system");

                    return new Result<ApartamentModulesDTO>(false, errors);
                }

                var apartament = new Apartament
                {
                    Address = request.Address,
                    City = request.City,
                    CreatedBy = request.UserId.ToString(),
                    ShortName = request.ShortName
                };

                byte[] passwordKey = NullableStringHelper.GetBytesFromHexString(_secretKeySettings.PasswordSecretKey);
                (apartament.PasswordHash, apartament.PasswordKey) = _passwordService.EncryptPasswordWithAes(request.Password, passwordKey);

                _context.Apartaments.Add(apartament);

                var userApartaments = new UserApartament
                {
                    Apartament = apartament,
                    User = user
                };

                _context.UserApartaments.Add(userApartaments);

                await _context.SaveChangesAsync(cancellationToken);
                
                return new Result<ApartamentModulesDTO>(true, new ApartamentModulesDTO 
                { });

            }
            catch (Exception ex)
            {
                return new Result<ApartamentModulesDTO>(false, new List<string> { ex.Message });
            }
        }
    }

}
