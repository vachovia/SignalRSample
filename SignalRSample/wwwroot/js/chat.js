const messagesList = document.getElementById("messagesList");
const sendMessage = document.getElementById("sendMessage");
sendMessage.disabled = true;

// create connection to the SignalR hub
const connectionChat = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/chat").build();

// start the connection
connectionChat.start().then(fulfilled, rejected);
function fulfilled() {
    sendMessage.disabled = false;
    console.log("SignalR connection established for chat hub.");
}
function rejected(error) {
    console.error("Error establishing SignalR connection: ", error.toString())
}

// Receive messages from chat hub
connectionChat.on("messageReceived", (user, message) => {
    const li = document.createElement("li");
    li.textContent = `${user} - ${message}`;
    messagesList.appendChild(li);
    console.log(user, message);
});

sendMessage.addEventListener("click", function (event) {
    const senderEmail = document.getElementById("senderEmail");
    const receiverEmail = document.getElementById("receiverEmail");
    const chatMessage = document.getElementById("chatMessage");
    
    if ((receiverEmail.value || "").trim()) {
        connectionChat.send("SendMessageToReceiver", senderEmail.value, receiverEmail.value, chatMessage.value).catch((error) => {
            console.error(error.toString())
        });
    } else {
        connectionChat.send("SendMessageToAll", senderEmail.value, chatMessage.value).catch((error) => {
            console.error(error.toString())
        });
    }
    event.preventDefault();
});