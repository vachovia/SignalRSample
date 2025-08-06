using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignalRSample.Data;

namespace SignalRSample.Hubs
{
    public class ChatHub: Hub
    {
        private readonly ApplicationDbContext _dbContext;

        public ChatHub(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task SendMessageToAll(string user, string message)
        {
            // Send the message to all connected clients
            await Clients.All.SendAsync("messageReceived", user, message);
        }

        [Authorize]
        public async Task SendMessageToReceiver(string sender, string receiver, string message)
        {
            var userReceiver = _dbContext.Users.FirstOrDefault(
                u => u.Email != null && u.Email.ToLower() == receiver.ToLower()
            );

            if (userReceiver is not null)
            {
                // Send the message to all connected clients
                await Clients.User(userReceiver.Id).SendAsync("messageReceived", sender, message);
            }
        }
    }
}
