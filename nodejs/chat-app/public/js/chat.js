const socket = io();

const messageForm = document.querySelector("#message-form");
const sndButton = document.querySelector("#sndButton");
const locButton = document.querySelector("#locButton");
const txtMessage = document.querySelector("#txtMessage");
const messages = document.querySelector("#messages");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// templates
const messageTemplate = document.querySelector("#message-template").innerHTML;
const locationMessageTemplate =
  document.querySelector("#location-template").innerHTML;
const sidebarTemplate = document.querySelector("#sidebar-template").innerHTML;

const autoscroll = () => {
  const newMessage = messages.lastElementChild;
  const newMessageStyle = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyle.marginBottom);
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  const visibleHeight = messages.offsetHeight;
  const containerHeight = messages.scrollHeight;
  const scrollOffset = messages.scrollTop + visibleHeight;

  if (containerHeight - newMessageHeight <= scrollOffset) {
    messages.scrollTop = messages.scrollHeight;
  }
};

socket.on("message", (message) => {
  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("locationMessage", (message) => {
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    url: message.url,
    createdAt: moment(message.createdAt).format("h:mm a"),
  });
  messages.insertAdjacentHTML("beforeend", html);
  autoscroll();
});

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });
  document.querySelector("#sidebar").innerHTML = html;
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
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

socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
