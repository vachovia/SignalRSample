

// create connection to the SignalR hub
const connectionOrder = new signalR.HubConnectionBuilder()
    .withUrl("/hubs/order").build();

// start the connection
connectionOrder.start().then(fulfilled, rejected);
function fulfilled() {
    console.log("SignalR connection established for order hub.");
}
function rejected(error) {
    console.error("Error establishing SignalR connection: ", error.toString())
}

// Receive messages from chat hub
connectionOrder.on("orderCreated", () => {
    toastr.success("New order received.");
    dataTable.ajax.reload();
});

// Load the DataTable when the document is ready
var dataTable;

function loadDataTable() {

    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Home/GetAllOrder"
        },
        "columns": [
            { "data": "id", "width": "5%" },
            { "data": "name", "width": "15%" },
            { "data": "itemName", "width": "15%" },
            { "data": "count", "width": "15%" },
            {
                data: "id",
                "render": function (data) {
                    return `<div class="w-75 btn-group" role="group">
                        <a href="" class="btn btn-primary mx-2"><i class="bi bi-pencil-square"></i></a>                      
					</div>`;
                },
                "width": "5%"
            }
        ]
    });
}
