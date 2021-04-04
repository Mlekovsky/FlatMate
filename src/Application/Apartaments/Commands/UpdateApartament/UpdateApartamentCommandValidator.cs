using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Apartaments.Commands.UpdateApartament
{
    public class UpdateApartamentCommandValidator : AbstractValidator<UpdateApartamentCommand>
    {
        public UpdateApartamentCommandValidator()
        {
            RuleFor(x => x.Address).NotEmpty().WithMessage("Address cannot be empty");
            RuleFor(x => x.City).NotEmpty().WithMessage("City cannot be empty");
            RuleFor(x => x.ShortName).NotEmpty().WithMessage("Short name cannot be empty");
        }
    }
}
