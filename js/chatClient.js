let websocket;
let  pseudo = prompt("Pseudo");

//------------------------------------------------------------------------------
//--- createWebSocket ----------------------------------------------------------
//------------------------------------------------------------------------------
// Function to load the received (Ajax) chat users.
createWebSocket();

function createWebSocket() {
  websocket = new WebSocket('ws://localhost:12345');
  //let msg = document.getElementById('chat-message').value;
  // let b1 = document.getElementById('inlineFormInputGroup');
  let b1 = document.querySelector('#chat-send');
  // b1.onclick = function(){
  //   sendMessage();
  // };
  b1.addEventListener("submit", sendMessage);

  websocket.onmessage = function(event) {
    console.log(event.data);
    printMessage(event);
  }
}

function printMessage(event){
  let data = event.data;
  let tchat = document.getElementById("textAreaChat");
  let oldData = document.getElementById("textAreaChat").value;
  tchat.setAttribute("disabled", false);
  if (data != ""){
      if (oldData != ""){
          tchat.innerHTML = oldData + "\n" + data;
          document.getElementById("inlineFormInputGroup").value = "";
      }
      else {
          tchat.innerHTML = data;
          document.getElementById("inlineFormInputGroup").value = "";
      }
  }
}

function sendMessage(event) {
  // websocket.onopen = function(event) {}
   event.preventDefault();
   let msg = pseudo + " : " + document.getElementById('inlineFormInputGroup').value;
   websocket.send(msg);
  //  websocket.onclose = function() {}

}


// function sendMessage(event){
//   // event.preventDefault();

//   let msg = pseudo + " : " + document.getElementById('inlineFormInputGroup').value;
//   websocket.send(msg);

//   document.getElementById('inlineFormInputGroup').value = "";

//   document.getElementById('textAreaChat').value = msg;
// }

// websocket.onopen = function(event) {
//   console.log('Connexion établie');
//   websocket.send('Hi server!');
// }

// websocket.onmessage = function(event) {
//   console.log(event.data);
// }

// websocket.onclose = function() {
//    console.log('Communication terminée');
// }