"use strict"

var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
	//messagesList
	var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	var long_message = `${user} says ${msg}`;
	var li = document.createElement("li");
	li.textContent = long_message;
	document.getElementById("messagesList").appendChild(li);
});

connection.start().then(
	// success
	function () {
	document.getElementById("sendButton").disabled = false;	
	}).catch(function (err) {
	// failure
	alert('error')
	alert(err)
});

document.getElementById("sendButton").addEventListener("click", function (event) {
	var user = document.getElementById("userInput").value;
	var message = document.getElementById("messageInput").value;
	connection.invoke("SendMessage", user, message).catch(function (err) {
		return console.error(err.toString());
	})
	event.preventDefault();
})