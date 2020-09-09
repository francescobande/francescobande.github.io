var stompClient = null;
var accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGgiOiJDX0VWRU5ULERfQUxFUlQsRF9FVkVOVCxEX0lOQ0lERU5ULERfUEFUUk9MLFJPTEVfQURNSU4sUk9MRV9VU0VSLFJfQUxFUlQsUl9FVkVOVCxSX0lOQ0lERU5ULFJfUEFUUk9MLFJfU01TLFdfQUxFUlQsV19FVkVOVCxXX0lOQ0lERU5ULFdfUEFUUk9MLFdfU01TIiwiZXhwIjoxNTk5NTc2OTUwfQ.7okbVWdODAoUmu9Ke-v1NwuxGUYTOLWOPYkIBgzCu8BrK7l-pNrNg7a59sqp6KX4405tcUxKDLeRI5qtWeUu4Q.azRfkNLUvWgpM3QOHR0FowludRInEW2653XM5Bty8KXGmSKz71djKvbd7kqXoD51mLc_esMfIstVhFNP1pxqBg";

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}


function connect() {
    var socket = new SockJS('http://localhost:8080/websocket');
    stompClient = Stomp.over(socket);

    var headers = {
        'Authorization': "Bearer " + accessToken
    }

    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/incident', function (incident) {
            showGreeting(incident.body);
        });
        stompClient.subscribe('/topic/event', function (event) {
            showGreeting(event.body);
        });
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

