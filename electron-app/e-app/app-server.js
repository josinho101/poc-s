const express = require("express");
const getMAC = require("getmac").default;

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  const mac = getMAC();
  res.send(mac);
});

app.listen(port, () => {
  console.log(`E-app listening at http://localhost:${port}`);
});
