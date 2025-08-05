const sendButton = document.getElementById("sendButton");
sendButton.disabled = true;

// create connection to the SignalR hub
const connectionNotification = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/notification").build();

// start the connection
connectionNotification.start().then(fulfilled, rejected);
function fulfilled() {
    sendButton.disabled = false;
    console.log("SignalR connection established for notification hub.");
    // Invoke on start to get the initial values
    connectionNotification.send("LoadMessages");
}
function rejected(error) {
    console.error("Error establishing SignalR notification connection: ", error.toString())
}

// register the event handler for house joined
sendButton.addEventListener("click", function (event) {
    const messageInput = document.getElementById("notificationInput");
    connectionNotification.send("SendMessage", messageInput.value).then(() => {
        messageInput.value = "";
        toastr.success("Notification sent successfully.");
    });
    event.preventDefault();
});

connectionNotification.on("loadNotifications", (messages, counter) => {
    const messageList = document.getElementById("messageList");
    const notificationCounter = document.getElementById("notificationCounter");
    messageList.innerHTML = "";
    notificationCounter.innerHTML = `<span>(${counter})</span>`;
    for (let i = messages.length - 1; i >= 0; i--) {
        const li = document.createElement("li");
        li.textContent = `Notification - ${messages[i]}`;
        messageList.appendChild(li);
    }
});