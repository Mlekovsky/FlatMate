using FluentValidation;

namespace FlatMate_backend.Application.TodoItems.Commands.UpdateTodoItemDetail
{
    public class UpdateTodoItemDetailCommandValidator : AbstractValidator<UpdateTodoItemDetailCommand>
    {
        public UpdateTodoItemDetailCommandValidator()
        {
            RuleFor(v => v.Title)
                    .MaximumLength(200)
                    .NotEmpty();
        }
    }
}
