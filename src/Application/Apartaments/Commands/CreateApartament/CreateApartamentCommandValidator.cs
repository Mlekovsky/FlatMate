using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Apartaments.Commands.CreateApartament
{
    public class CreateApartamentCommandValidator : AbstractValidator<CreateApartamentCommand>
    {
        public CreateApartamentCommandValidator()
        {
            RuleFor(x => x.Address).NotEmpty().WithMessage("Address cannot be empty");

            RuleFor(x => x.City).NotEmpty().WithMessage("City cannot be empty");

            RuleFor(x => x.ShortName).NotEmpty().WithMessage("Short name cannot be empty");

            RuleFor(x => x.Password).NotEmpty().WithMessage("Password cannot be empty");
        }
    }
}
