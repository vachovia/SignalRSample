using SignalRSample.Hubs;

namespace SignalRSample.Middleware
{
    public static class AppMiddleware
    {
        public static IApplicationBuilder UseMappedHubsRoutes(this WebApplication app)
        {
            app.MapHub<UserHub>("/hubs/userCount");
            app.MapHub<DeathlyHallowsHub>("/hubs/deathlyHallows");
            app.MapHub<HouseGroupHub>("/hubs/houseGroup");
            return app;
        }
    }
}
