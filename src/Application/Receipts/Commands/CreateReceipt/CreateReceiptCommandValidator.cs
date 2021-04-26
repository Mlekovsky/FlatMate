using FlatMate_backend.Application.Receipts.Commands.CreateReceipt;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace FlatMate_backend.Application.Receipts.Commands
{
    public class CreateReceiptCommandValidator : AbstractValidator<CreateReceiptCommand>
    {
        public CreateReceiptCommandValidator()
        {
            RuleFor(v => v.Title)
              .NotEmpty().WithMessage("Title is required.")
              .MaximumLength(200).WithMessage("Title must not exceed 200 characters.");

            RuleFor(v => v.Date)
              .NotEmpty().WithMessage("Title is required.");
        }
    }
}
