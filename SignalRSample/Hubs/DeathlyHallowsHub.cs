using Microsoft.AspNetCore.SignalR;
using System.Runtime.InteropServices;

namespace SignalRSample.Hubs
{
    public class DeathlyHallowsHub: Hub
    {
        public Dictionary<string, int> GetRaceStatus()
        {
            return SD.DeathlyHallowRace;
        }
    }
}
