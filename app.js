const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const socket = require("socket.io");

const PORT = process.env.PORT || 8000;
const ISDEV = process.env.NODE_ENV !== "production";
const app = express();

let blue = 0;

app.use(cors());
app.use(morgan("tiny"));
app.use(express.static("public"));

const server = app.listen(PORT, () => {
  console.clear();
  console.log(
    chalk.cyanBright(
      `Server started on PORT ${`${PORT} ${
        ISDEV ? `http://localhost:${PORT}` : ""
      }`} at ${Date()}`
    )
  );
});

const io = socket(server);

io.sockets.on("connection", (soc) => {
  soc.emit("blue", blue);
  console.log(
    chalk.greenBright(
      `___________________________________\n|joined-------${soc.id}|\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n`
    )
  );
  soc.on("disconnect", () => {
    console.log(
      chalk.redBright(
        `____________________________________\n|left---------${soc.id}|\n‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n`
      )
    );
  });
  soc.on("getblue", () => {
    soc.emit("blue", blue);
  });
  soc.on("postblue", (data) => {
    blue = data;
    console.log(
      chalk.bgRgb(0, 0, blue)(blue),
      (String(data).length == 1 ? "  " : String(data).length == 2 ? " " : "") +
        chalk.whiteBright(`<<-  ${soc.id}`)
    );
    soc.broadcast.emit("blue", blue);
  });
});
