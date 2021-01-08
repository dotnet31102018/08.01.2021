using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRDemo.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            // TODO: add filter not to publish message to same user...
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
