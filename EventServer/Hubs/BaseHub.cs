using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EventServer.Hubs
{
    public class BaseHub : Hub
    {
        public List<string> ConnectedUsers { get; private set; } = new List<string>();

        public override Task OnConnectedAsync()
        {
            ConnectedUsers.Add(Context.ConnectionId);
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            ConnectedUsers.Remove(Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }
    }
}
