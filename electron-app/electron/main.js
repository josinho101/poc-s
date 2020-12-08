const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const getMac = require("getmac").default;

const { initSplashScreen, OfficeTemplate } = require("electron-splashscreen");
const isDev = require("electron-is-dev");
const { resolve } = require("app-root-path");

let mainWindow;

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });

  mainWindow = new BrowserWindow({
    show: false,
    title: "React Electron App",
  });
  mainWindow.loadURL(startUrl);

  console.log("Mac address : ", getMac());

  const hideSplashscreen = initSplashScreen({
    mainWindow,
    color: "grey",
    icon: isDev ? resolve("assets/icon.ico") : undefined,
    url: OfficeTemplate,
    width: 500,
    height: 300,
    brand: "Electron App",
    productName: "React",
    logo: resolve("assets/logo.svg"),
    website: "www.reactjs.org",
    text: "Validating MAC address...",
  });

  setTimeout(() => {
    mainWindow.maximize();
    mainWindow.show();
    hideSplashscreen();
  }, 5000);

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
