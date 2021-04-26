using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.ReceiptsPosition.Commands.CreateReceiptPosition
{
    public class CreateReceiptPositionCommandValidator : AbstractValidator<CreateReceiptPositionCommand>
    {
        public CreateReceiptPositionCommandValidator()
        {
            RuleFor(x => x.Product)
            .NotEmpty().WithMessage("Product name cannot be empty")
            .MaximumLength(200).WithMessage("Name cannot be longer than 200 characters");

            RuleFor(x => x.Value)
             .GreaterThan(0)
             .WithMessage("Value cannot be less than 0");
        }
    }
}
