let result;
const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJDX0VWRU5ULERfQUxFUlQsRF9FVkVOVCxEX0lOQ0lERU5ULERfUEFUUk9MLFJPTEVfQURNSU4sUk9MRV9VU0VSLFJfQUxFUlQsUl9FVkVOVCxSX0lOQ0lERU5ULFJfUEFUUk9MLFJfU01TLFdfQUxFUlQsV19FVkVOVCxXX0lOQ0lERU5ULFdfUEFUUk9MLFdfU01TIiwiZXhwIjoxNTk5NzQ4OTAxfQ.AO4upKD_OCF6QDiikFiPdkTWgARMFqczf-wrKo12oVNH-m-5Qag3CzVdQ6bY3SCKLNg1RaFXTfe_zv_pZINiHg";

function connect() {
    console.log("Connecting...");
    subscribe();
}

function subscribe() {
    console.log("Calling the API");
    $.ajax({
        url: "http://localhost:8080/SIA-NSP-API/api/v1/incidents/subscribe",
        type: 'GET',
        headers: {"Authorization": "Bearer " + accessToken},
        data: JSON,
        error: function(err) {
            switch (err.status) {
                case "400":
                    console.log("bad request");
                    break;
                case "401":
                    console.log("unauthorized");
                    break;
                case "403":
                    console.log("forbidden");
                  break;
                default:
                    console.log("Something bad happened");
                  break;
            }
        },
        success: function(data) {
            console.log(`Success! \n ${data}`);
        },
        complete: function() {
            console.log("Connecting again...");
            connect();
        }
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function showGreeting(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    $( "#connect" ).click(function() { connect(); });
    $( "#disconnect" ).click(function() { disconnect(); });
    $( "#send" ).click(function() { sendName(); });
});

