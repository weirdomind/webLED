const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const socket = require("socket.io");

const PORT = process.env.PORT || 8000;
const app = express();

let blue = 0;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.clear();
  console.log(chalk.cyanBright(`Server started on PORT ${PORT} at ${Date()}`));
});

const io = socket(server);

io.sockets.on("connection", (soc) => {
  soc.emit("blue", blue);
  console.log(`joined    ${soc.id}`);
  soc.on("disconnect", () => {
    console.log(`left      ${soc.id}`);
  });
  soc.on("getblue", () => {
    soc.emit("blue", blue);
  });
  soc.on("postblue", (data) => {
    blue = data;
    console.log(
      chalk.blueBright(`blue ${blue}`),
      chalk.whiteBright(`<<- ${soc.id}`)
    );
    soc.broadcast.emit("blue", blue);
  });
});
