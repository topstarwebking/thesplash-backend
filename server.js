require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const conf = require("config.json");
const { default: mongoose } = require("mongoose");
const fs = require("fs");

// fs.readFile("_helpers/_static/banner.art", (error, data) => {
//   if (error) {
//     throw error;
//   }
//   console.log(data.toString());
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + "/_helpers/_static"));
// api routes
// app.use("/users", require("./controllers/users.controller"));
app.use("/whitelist", require("./controllers/whitelist.controller"));
// app.use("/cart", require("./controllers/cart.controller"));
// app.use("/ci", require("./controllers/cartinventory.controller"));
// app.use("/inv", require("./controllers/invzip.controller"));
// app.use("/invite", require("./controllers/invite.controller"));
// app.use("/location", require("./controllers/cartlocation.controller"));
// app.use("/basket", require("./controllers/basket.controller"));

//Default route
app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/_helpers/_static/welcome.html");
});

app.get("*", function (req, res) {
  console.log("here");
  res.sendFile(__dirname + "/_helpers/_static/error.html");
});

// start server
const server = app.listen(conf.appPort, function () {
  console.log(`\nServer is listening on port ${conf.appPort}`);
});

process.on("SIGTERM", function () {
  server.close(function () {
    console.log("\nSIGTERM command received - Shutting down...");
    mongoose.disconnect();
    process.exit(0);
  });
});

process.on("SIGINT", function () {
  server.close(function () {
    console.log("\nSIGINT command received - Shutting down...");
    mongoose.disconnect();
    process.exit(0);
  });
});
