let canvas;
let ctx;
let id;
let count = 0;

function animate() {
  const message = "completed-" + id + ", item count - " + count;
  console.time(message);
  for (i = 0; i < count; i++) {
    var x = Math.floor(Math.random() * 400);
    var y = Math.floor(Math.random() * 400);
    // var radius = Math.floor(Math.random() * 20);
    var radius = 2;

    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);

    ctx.beginPath();
    ctx.arc(x, y, radius, Math.PI * 2, 0, false);
    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fill();
    ctx.closePath();
  }
  console.timeEnd(message);
}

self.onmessage = function (ev) {
  if (ev.data.msg === "offscreen") {
    canvas = ev.data.canvas;
    ctx = canvas.getContext("2d");
    id = ev.data.id;
    count = ev.data.count;
    animate();
  }
};
