const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const chalk = require("chalk");
const socket = require("socket.io");

const PORT = process.env.PORT || 8000;
const ISDEV = process.env.NODE_ENV !== "production";
const app = express();

let color = "#000000";
let isBoardReady = false;

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
  soc.broadcast.emit("boardstate", isBoardReady);
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
  // custom events

  soc.on("forward", ({ eventname, data }) => {
    soc.broadcast.emit(eventname, data);
  });

  soc.on("boardstate", (data) => {
    isBoardReady = data;
    soc.broadcast.emit("boardstate", data);
  });
});
