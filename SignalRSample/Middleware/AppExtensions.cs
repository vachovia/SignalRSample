using SignalRSample.Hubs;

namespace SignalRSample.Middleware
{
    public static class AppMiddleware
    {
        public static IApplicationBuilder UseMappedHubs(this WebApplication app)
        {
            app.MapHub<UserHub>("/hubs/userCount");
            app.MapHub<DeathlyHallowsHub>("/hubs/deathlyHallows");
            return app;
        }
    }
}
