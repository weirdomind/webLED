const socket = io.connect();
const colorinp = document.getElementById("colorinp");

socket.on("boardstate", (data) => {
  colorinp.disabled = !data;
  console.log("boardstate", data);
});

colorinp.oninput = (e) => {
  socket.emit("forward", { eventname: "postcolor", data: e.target.value });
  console.log(e.target.value);
};
