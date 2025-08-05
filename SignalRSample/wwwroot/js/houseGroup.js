const lbl_houseJoined = document.getElementById("lbl_houseJoined");

const btn_gryffindor = document.getElementById("btn_gryffindor");
const btn_slytherin = document.getElementById("btn_slytherin");
const btn_hufflepuff = document.getElementById("btn_hufflepuff");
const btn_ravenclaw = document.getElementById("btn_ravenclaw");

const btn_un_gryffindor = document.getElementById("btn_un_gryffindor");
const btn_un_slytherin = document.getElementById("btn_un_slytherin");
const btn_un_hufflepuff = document.getElementById("btn_un_hufflepuff");
const btn_un_ravenclaw = document.getElementById("btn_un_ravenclaw");

const trigger_gryffindor = document.getElementById("trigger_gryffindor");
const trigger_slytherin = document.getElementById("trigger_slytherin");
const trigger_hufflepuff = document.getElementById("trigger_hufflepuff");
const trigger_ravenclaw = document.getElementById("trigger_ravenclaw");

// create connection to the SignalR hub
const connectionHouseGroup = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/houseGroup").build();

// start the connection
connectionHouseGroup.start().then(fulfilled, rejected);
function fulfilled() {
    console.log("SignalR connection established for house group hub.");    
}
function rejected(error) {
    console.error("Error establishing SignalR house group connection: ", error.toString())
}

// connect to methods that hub invokes aka receive messages from hub
connectionHouseGroup.on("subscriptionStatus", (groupsJoined, houseName, hasSubscribed) => {
    lbl_houseJoined.innerText = groupsJoined;

    if (hasSubscribed) {
        switch (houseName) {
            case 'Gryffindor': btn_gryffindor.style.display = "none"; btn_un_gryffindor.style.display = ""; break;
            case 'Slytherin': btn_slytherin.style.display = "none"; btn_un_slytherin.style.display = ""; break;
            case 'Hufflepuff': btn_hufflepuff.style.display = "none"; btn_un_hufflepuff.style.display = ""; break;
            case 'Ravenclaw': btn_ravenclaw.style.display = "none"; btn_un_ravenclaw.style.display = ""; break;
            default: break;
        }
        toastr.success(`You have subscribed successfully. ${houseName}`);
    } else {
        switch (houseName) {
            case 'Gryffindor': btn_gryffindor.style.display = ""; btn_un_gryffindor.style.display = "none"; break;
            case 'Slytherin': btn_slytherin.style.display = ""; btn_un_slytherin.style.display = "none"; break;
            case 'Hufflepuff': btn_hufflepuff.style.display = ""; btn_un_hufflepuff.style.display = "none"; break;
            case 'Ravenclaw': btn_ravenclaw.style.display = ""; btn_un_ravenclaw.style.display = "none"; break;
            default: break;
        }
        toastr.warning(`You have unsubscribed successfully. ${houseName}`);
    }
});
connectionHouseGroup.on("newMemberAddedToHouse", (houseName) => {
    toastr.success(`Member has subscribed to ${houseName}`);
});
connectionHouseGroup.on("newMemberRemovedFromHouse", (houseName) => {
    toastr.warning(`Member has unsubscribed from ${houseName}`);
});
connectionHouseGroup.on("houseNotification", (houseName) => {
    toastr.success(`A new notification for ${houseName} has been launched`);
});

// register the event handler for house joined
btn_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Gryffindor")
    event.preventDefault();
});
btn_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Slytherin")
    event.preventDefault();
});
btn_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Hufflepuff")
    event.preventDefault();
});
btn_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("JoinHouse", "Ravenclaw")
    event.preventDefault();
});

btn_un_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Gryffindor")
    event.preventDefault();
});
btn_un_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Slytherin")
    event.preventDefault();
});
btn_un_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Hufflepuff")
    event.preventDefault();
});
btn_un_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("LeaveHouse", "Ravenclaw")
    event.preventDefault();
});

trigger_gryffindor.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Gryffindor")
    event.preventDefault();
});
trigger_slytherin.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Slytherin")
    event.preventDefault();
});
trigger_hufflepuff.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Hufflepuff")
    event.preventDefault();
});
trigger_ravenclaw.addEventListener("click", function (event) {
    connectionHouseGroup.send("TriggerHouseNotify", "Ravenclaw")
    event.preventDefault();
});