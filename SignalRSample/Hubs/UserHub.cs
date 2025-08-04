using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class UserHub: Hub
    {
        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;

        public override async Task OnConnectedAsync()
        {
            TotalUsers++;
            // Notify all connected clients about the updated total users count
            await Clients.All.SendAsync("updateTotalUsers", TotalUsers);
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            // Notify all connected clients about the updated total users count
            // await Clients.All.SendAsync("updateTotalUsers", TotalUsers);
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            await base.OnDisconnectedAsync(exception);
        }

        public async Task<string> NewWindowLoaded(string name)
        {
            TotalViews++;
            // Notify all connected clients about the updated total views count
            await Clients.All.SendAsync("updateTotalViews", TotalViews);
            return $"Total Views from {name}: {TotalViews}";
        }
    }
}
