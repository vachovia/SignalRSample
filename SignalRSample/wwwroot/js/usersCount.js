const countSpan = document.getElementById("totalViewsCounter");
const userSpan = document.getElementById("totalUsersCounter");

// create connection to the SignalR hub
const connectionUserCount = new signalR.HubConnectionBuilder()
    // .configureLogging(signalR.LogLevel.Information) // uncomment to see logs in console
    .withUrl("/hubs/userCount").build(); // default transport is WebSockets

// const connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount", signalR.HttpTransportType.ServerSentEvents).build();

// const connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount", signalR.HttpTransportType.LongPolling).build();


// start the connection
connectionUserCount.start().then(fulfilled, rejected);
function fulfilled() {
    console.log("SignalR connection established for user hub.");
    newWindowLoadedOnClient();
}
function rejected(error) {
    console.error("Error establishing SignalR connection: ", error.toString())
}

// connect to methods that hub invokes aka receive messages from hub
connectionUserCount.on("updateTotalViews", (totalViews) => {    
    countSpan.innerText = totalViews.toString();
});

connectionUserCount.on("updateTotalUsers", (totalViews) => {    
    userSpan.innerText = totalViews.toString();
});

// invoke hub methods aka send messages to hub
function newWindowLoadedOnClient() {
    //connectionUserCount.send("NewWindowLoaded", "Vlad").then((value) => {
    //    console.log("NewWindowLoaded send successfully, response: ", value);
    //}); // send doesn't have response
    connectionUserCount.invoke("NewWindowLoaded", "Vlad").then((value) => {
        console.log("NewWindowLoaded invoked successfully, response: ", value);
    }); // invoke have response
}