using Microsoft.AspNetCore.SignalR;

namespace SignalRSample.Hubs
{
    public class HouseGroupHub: Hub
    {
        public static List<string> GroupsJoined { get; set; } = new();

        public async Task JoinHouse(string houseName)
        {
            string houseList = "";

            string key = $"{Context.ConnectionId}:{houseName}";

            var houseExists = GroupsJoined.Contains(key);

            if(!houseExists)
            {
                GroupsJoined.Add(key);

                foreach (var group in GroupsJoined)
                {
                    if (group.Contains(Context.ConnectionId))
                    {
                        houseList += group.Split(':')[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, true);
                await Clients.Others.SendAsync("newMemberAddedToHouse", houseName);
                await Groups.AddToGroupAsync(Context.ConnectionId, houseName);
            }
            //else
            //{
            //    await Clients.Caller.SendAsync("ReceiveMessage", $"You are already in the {houseName} group.");
            //}
        }

        public async Task LeaveHouse(string houseName)
        {
            string houseList = "";

            string key = $"{Context.ConnectionId}:{houseName}";

            var houseExists = GroupsJoined.Contains(key);

            if (houseExists)
            {
                GroupsJoined.Remove(key);

                foreach (var group in GroupsJoined)
                {
                    if (group.Contains(Context.ConnectionId))
                    {
                        houseList += group.Split(':')[1] + " ";
                    }
                }

                await Clients.Caller.SendAsync("subscriptionStatus", houseList, houseName, false);
                await Clients.Others.SendAsync("newMemberRemovedFromHouse", houseName);
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, houseName);
            }
        }

        public async Task TriggerHouseNotify(string houseName)
        {
            await Clients.Group(houseName).SendAsync("houseNotification", houseName);
        }
    }
}
