const cloakCounterSpan = document.getElementById("cloakCounter");
const stoneCounterSpan = document.getElementById("stoneCounter");
const wandCounterSpan = document.getElementById("wandCounter");

// create connection to the SignalR hub
const connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/deathlyHallows").build();

// start the connection
connectionDeathlyHallows.start().then(fulfilled, rejected);
function fulfilled() {
    console.log("SignalR connection established for deathly hallows hub.");
    // Invoke on start to get the initial values
    connectionDeathlyHallows.invoke("GetRaceStatus").then((value) => {
        cloakCounterSpan.innerText = value.cloak.toString();
        stoneCounterSpan.innerText = value.stone.toString();
        wandCounterSpan.innerText = value.wand.toString();
    });
}
function rejected(error) {
    console.error("Error establishing SignalR deathly hallows connection: ", error.toString())
}

// Receive messages from hub when user hits Home Controller Method DeathlyHallows
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => {    
    cloakCounterSpan.innerText = cloak.toString();    
    stoneCounterSpan.innerText = stone.toString();    
    wandCounterSpan.innerText = wand.toString();
});