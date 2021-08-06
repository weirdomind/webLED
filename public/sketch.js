const socket = io.connect();
const colorinp = document.getElementById("colorinp");
colorinp.disabled = true;

socket.on("boardstate", (data) => {
  colorinp.disabled = !data;
  console.log(data);
});

colorinp.oninput = (e) => {
  socket.emit("forward", { eventname: "postcolor", data: e.target.value });
  console.log(e.target.value);
};

function rgb2hex(rgb) {
  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - (x % 16)) / 16] + hexDigits[x % 16];
}
