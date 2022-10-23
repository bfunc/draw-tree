/* function drawCircle(x, y, radius, lw = 1) {
  context.lineWidth = lw;
  context.strokeStyle = rndRGB();
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.stroke();
}
 */

function drawTrapezoid(x1, y1, x2, y2, x3, y3, x4, y4, color) {
  context.lineWidth = 1; //lw;
  context.strokeStyle = rndRGB();
  context.beginPath();

  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.lineTo(x3, y3);
  context.lineTo(x4, y4);

  context.fillStyle = color;
  context.fill();

  context.closePath();
  //context.stroke();
}

function drawTree({ W, H, context }) {
  context.fillStyle = "#000";
  context.lineWidth = 20;

  function drawLine(x1, y1, x2, y2, lw = 1) {
    context.lineWidth = 1; //lw;
    context.strokeStyle = rndRGB();
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.closePath();
    context.stroke();
  }

  var deg_to_rad = Math.PI / 180; // Angle * Math.PI / 180 > Convert to radians

  var stepLength = 100;
  var stepMinLength = 1;
  var spreadAngle = 20;
  var srcDepth = 9;
  var trunkWidth = 15;

  const depthStep = trunkWidth / srcDepth;
  const lengthStep = (stepLength - stepMinLength) / srcDepth;

  const getPerp = (sx, sy, a, l) => {
    var dx = l * Math.sin(a);
    var dy = l * Math.cos(a);
    var dx1 = sx - dx;
    var dy1 = sy + dy;
    var dx2 = sx + dx;
    var dy2 = sy - dy;
    return { dx1, dy1, dx2, dy2 };
  };

  function drawTree(x1, y1, angle, depth) {
    if (depth === 0) return;

    const aRad = angle * deg_to_rad;
    const len =
      depth === 1
        ? 50
        : (lengthStep * depth + stepMinLength) * (Math.random() + 0.5);

    const x2 = x1 + Math.cos(aRad) * len;
    const y2 = y1 + Math.sin(aRad) * len;

    const wBottom = depthStep * depth;
    const wTop = depthStep * (depth - 1);

    const bottomPerp = getPerp(x1, y1, aRad, wBottom);
    const topPerp = getPerp(x2, y2, aRad, wTop);

    // -----------------

    // drawLine(bottomPerp.dx1, bottomPerp.dy1, bottomPerp.dx2, bottomPerp.dy2);
    // drawLine(topPerp.dx1, topPerp.dy1, topPerp.dx2, topPerp.dy2);
    // drawLine(bottomPerp.dx1, bottomPerp.dy1, topPerp.dx1, topPerp.dy1);
    // drawLine(bottomPerp.dx2, bottomPerp.dy2, topPerp.dx2, topPerp.dy2);
    if (depth === 1) {
      const topPerp2 = getPerp(x2, y2, aRad, depthStep * srcDepth);
      drawTrapezoid(
        bottomPerp.dx1,
        bottomPerp.dy1,
        topPerp2.dx1,
        topPerp2.dy1,
        topPerp2.dx2,
        topPerp2.dy2,
        bottomPerp.dx2,
        bottomPerp.dy2,
        `rgba(0, 150, 0, .6)`
      );
    } else {
      drawTrapezoid(
        bottomPerp.dx1,
        bottomPerp.dy1,
        topPerp.dx1,
        topPerp.dy1,
        topPerp.dx2,
        topPerp.dy2,
        bottomPerp.dx2,
        bottomPerp.dy2,
        `rgb(0, ${250 / depth - 20}, 0)`
      );
    }

    let rnd = Math.floor(Math.random() * 3 + 1);
    switch (rnd) {
      case 1:
        drawTree(x2, y2, angle, depth - 1);
        break;
      case 2:
        drawTree(x2, y2, angle - spreadAngle, depth - 1);
        drawTree(x2, y2, angle + spreadAngle, depth - 1);
        break;
      case 3:
        drawTree(x2, y2, angle - spreadAngle, depth - 1);
        drawTree(x2, y2, angle + spreadAngle / 2, depth - 1);
        drawTree(x2, y2, angle + spreadAngle, depth - 1);
        break;
    }
  }

  drawTree(0, -H / 2, 90, srcDepth, spreadAngle);
}
