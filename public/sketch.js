const socket = io.connect();
const blueslider = document.getElementById("blueslider");
let blue = 0;

socket.on("blue", (data) => {
  blue = data;
  blueslider.value = data;
  console.log("got blue", data);
});

blueslider.oninput = (e) => {
  const data = e.target.value;
  blue = data;
  socket.emit("postblue", data);
  console.log(data);
};
