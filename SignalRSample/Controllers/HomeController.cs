using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRSample.Data;
using SignalRSample.Hubs;
using SignalRSample.Models;
using System.Diagnostics;

namespace SignalRSample.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowsHub> _deathlyHallowsHub;        

        public HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowsHub> deathlyHallowsHub, ApplicationDbContext context)
        {
            _logger = logger;
            _context = context;
            _deathlyHallowsHub = deathlyHallowsHub;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Notification()
        {
            return View();
        }

        public IActionResult DeathlyHallowsRace()
        {
            return View();
        }

        public IActionResult HarryPotterHouse()
        {
            return View();
        }

        public IActionResult BasicChat()
        {
            return View();
        }

        [ActionName("Order")]
        public IActionResult Order()
        {
            string[] name = { "Sam", "Ben", "Jess", "Laura", "Ron" };
            string[] itemName = { "Food1", "Food2", "Food3", "Food4", "Food5" };

            Random rand = new Random();
            // Generate a random index less than the size of the array.  
            int index = rand.Next(name.Length);

            Order order = new Order()
            {
                Name = name[index],
                ItemName = itemName[index],
                Count = index + 1
            };

            return View(order);
        }

        [ActionName("Order")]
        [HttpPost]
        public async Task<IActionResult> OrderPost(Order order)
        {

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Order));
        }

        [ActionName("OrderList")]
        public IActionResult OrderList()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetAllOrder()
        {
            var orderList = _context.Orders.ToList();
            return Json(new { data = orderList });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<IActionResult> DeathlyHallows(string type)
        {
            var key = SD.DeathlyHallowRace.ContainsKey(type);

            if (key)
            {
                SD.DeathlyHallowRace[type]++;
            }

            await _deathlyHallowsHub.Clients.All.SendAsync(
                "updateDeathlyHallowsCount", SD.DeathlyHallowRace[SD.Cloak], SD.DeathlyHallowRace[SD.Stone], SD.DeathlyHallowRace[SD.Wand]
            );

            return Accepted();
        }
    }
}
