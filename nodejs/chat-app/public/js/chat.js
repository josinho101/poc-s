const socket = io();

const sndButton = document.querySelector("#sndButton");
const locButton = document.querySelector("#locButton");
const txtMessage = document.querySelector("#txtMessage");
const messages = document.querySelector("#messages");

// templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate =
  document.querySelector("#location-template").innerHTML;

socket.on("message", (message) => {
  console.log(message);
  const html = Mustache.render(messageTemplate, { message });
  messages.insertAdjacentHTML("beforeend", html);
});

socket.on("locationMessage", (url) => {
  console.log(url);
  const html = Mustache.render(locationMessageTemplate, { url });
  messages.insertAdjacentHTML("beforeend", html);
});

sndButton.addEventListener("click", () => {
  const message = txtMessage.value;
  sndButton.setAttribute("disabled", "disabled");
  socket.emit("sendMessage", message, (msg) => {
    sndButton.removeAttribute("disabled");
    txtMessage.value = "";
    txtMessage.focus();
  });
});

locButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported in this browser!!");
  }
  locButton.setAttribute("disabled", "disabled");
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("sendLocation", { latitude, longitude }, (msg) => {
      console.log(msg);
    });
    locButton.removeAttribute("disabled");
  });
});
