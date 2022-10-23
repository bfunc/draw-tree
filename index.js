const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

function getContext() {
  var W = window.innerWidth;
  var H = window.innerHeight;
  canvas.width = W;
  canvas.height = H;

  context.beginPath();
  context.rect(0, 0, W, H);
  context.fillStyle = "rgb(206, 226, 238)";
  context.fill();

  context.translate(W / 2, H / 2);
  context.rotate(Math.PI);
  context.scale(-1, 1);
  return {
    context,
    W,
    H,
  };
}

function redraw() {
  drawTree(getContext());
}

redraw(getContext());
window.addEventListener("resize", () => redraw);

function rndRGB() {
  var o = Math.round,
    r = Math.random,
    s = 155;

  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    "1" + //  r().toFixed(1) +
    ")"
  );
}

function rotateAroundPoint({ point, center }) {
  for (let index = 0; index < 90; index++) {
    var angle = index * (Math.PI / 180);
    var x1 = point.x - center.x;
    var y1 = point.y - center.y;
    var x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle);
    var y2 = x1 * Math.sin(angle) + y1 * Math.cos(angle);

    console.log(x2 + center.x, y2 + center.y);
  }
}
var point = { x: 100, y: 0 };
var center = { x: 0, y: 0 };
//rotateAroundPoint({ point, center });

var deep = 0;
function rotateAroundZero(point, a) {
  if (deep > 5) return;
  //for (let index = 0; index < 90; index += 2) {
  var angle = a * deg_to_rad;
  var x2 = point.x * Math.cos(angle) - point.y * Math.sin(angle);
  var y2 = point.x * Math.sin(angle) + point.y * Math.cos(angle);
  console.log(x2, point.x * Math.cos(angle), point.y * Math.sin(angle));
  console.log(y2, point.x * Math.sin(angle), point.y * Math.cos(angle));
  drawLine(point.x, point.y, x2, y2);
  deep++;
  rotateAroundZero({ x: x2, y: y2 }, a);
  //}
}
// rotateAroundZero({ x: 100, y: 0 }, -45);
