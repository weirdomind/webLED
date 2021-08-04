const socket = io.connect();
const blueslider = document.getElementById("blueslider");
const sample = document.getElementById("sample");
let blue = 0;

socket.on("blue", (data) => {
  blue = data;
  blueslider.value = data;
  sample.style.backgroundColor = `rgb(${255 - data}, ${255 - data}, ${255})`;
  console.log("got blue", data);
});

blueslider.oninput = (e) => {
  const data = e.target.value;
  blue = data;
  sample.style.backgroundColor = `rgb(${255 - data}, ${255 - data}, ${255})`;
  socket.emit("postblue", data);
  console.log(data);
};
