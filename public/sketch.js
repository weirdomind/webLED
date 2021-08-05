const socket = io.connect();
const blueslider = document.getElementById("blueslider");
const sample = document.getElementById("sample");
let blue = 0;
blueslider.disabled = true;

socket.on("blue", (data) => {
  blue = data;
  blueslider.value = data;
  sample.style.backgroundColor = `rgb(${255 - data}, ${255 - data}, ${255})`;
  console.log("got blue", data);
});

socket.on("boardready", () => {
  console.log("board ready");
  blueslider.disabled = false;
});

blueslider.oninput = (e) => {
  const data = e.target.value;
  blue = data;
  sample.style.backgroundColor = `rgb(${255 - data}, ${255 - data}, ${255})`;
  socket.emit("postblue", data);
  console.log(data);
};

sample.onclick = (e) => {
  if (blue == 255) {
    socket.emit("postblue", 0);
    blue = 0;
  } else {
    socket.emit("postblue", 255);
    blue = 255;
  }
  blueslider.value = blue;
  sample.style.backgroundColor = `rgb(${255 - blue}, ${255 - blue}, ${255})`;
};
