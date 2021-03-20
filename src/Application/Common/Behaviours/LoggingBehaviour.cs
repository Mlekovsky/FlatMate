using FlatMate_backend.Application.Common.Interfaces;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;

namespace FlatMate_backend.Application.Common.Behaviours
{
    public class LoggingBehaviour<TRequest> : IRequestPreProcessor<TRequest>
    {
        private readonly ILogger _logger;
        //private readonly ICurrentUserService _currentUserService;
        //private readonly IIdentityService _identityService;

        public LoggingBehaviour(ILogger<TRequest> logger)
        {
            _logger = logger;
            //_currentUserService = currentUserService;
            //_identityService = identityService;
        }

        public async Task Process(TRequest request, CancellationToken cancellationToken)
        {
            var requestName = typeof(TRequest).Name;
            var userId = "Todo";
            string userName = string.Empty;

            if (!string.IsNullOrEmpty(userId))
            {
                userName = "TodoLater";
            }

            _logger.LogInformation("FlatMate_backend Request: {Name} {@UserId} {@UserName} {@Request}",
                requestName, userId, userName, request);
        }
    }
}
