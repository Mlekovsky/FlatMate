using Microsoft.AspNetCore.SignalR;
using Serilog;
using System;
using System.Threading.Tasks;

namespace EventServer.Hubs
{
    public class SimpleMessageHub : BaseHub
    {
        public async Task SendSimpleMessage(string message)
        {
            try
            {
                Log.Logger.Information($"Forwarding message from: {Context.ConnectionId}");
                await Clients.All.SendAsync("ReceiveSimpleMessage", message);
            }
            catch (Exception e)
            {
                Log.Logger.Error(e, $"Failed to send message via {nameof(SimpleMessageHub)}.");
            }
        }
    }
}
