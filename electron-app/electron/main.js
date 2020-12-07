const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const getMac = require("getmac").default;

let mainWindow;

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(startUrl);
  console.log("Mac address : ", getMac());
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
