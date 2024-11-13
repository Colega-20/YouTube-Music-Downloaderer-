var root = {
  wavecolor: {
    r: 125,
    g: 52,
    b: 253,
  },
  rainbowSpeed: 0.5,
  rainbow: true,
  matrixspeed: 50,
};

var c = document.getElementById("c");
var ctx = c.getContext("2d");
var hueFw = false;
var hue = -0.01;
var font_size = 16;
var drops = [];

// Llamamos a la función de ajuste del canvas inicialmente y también al redimensionar la ventana

function resizeCanvas() {
  // Establece el canvas al 100% del ancho y alto de la ventana
  c.style.width = window.innerWidth + 64;
  c.style.height = "103%"; // 100px más alto que la altura de la ventana
  c.width = window.innerWidth + 64;
  c.height = window.innerHeight + 16; // 100px más alto que la altura de la ventana

  // Recalcula el número de columnas
  var columns = Math.floor(c.offsetWidth / font_size);
  drops = [];
  for (var x = 0; x < columns; x++) drops[x] = 1;
}

// Llamamos a la función de ajuste del canvas inicialmente y también al redimensionar la ventana
window.addEventListener("resize", resizeCanvas, false);
resizeCanvas();

// Caracteres a usar
var konkani =
  "゠アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレワヰヱヲンヺ・ーヽヿ0123456789";
var characters = konkani.split("");

// Función de dibujo
function draw() {
  ctx.fillStyle = "rgba(0,0,0, 0.1)";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#BBB";
  ctx.font = font_size + "px arial";

  for (var i = 0; i < drops.length; i++) {
    ctx.fillStyle = "rgba(10,10,10, 0)";
    ctx.fillRect(i * font_size, drops[i] * font_size, font_size, font_size);
    var text = characters[Math.floor(Math.random() * characters.length)];

    if (root.rainbow) {
      hue += hueFw ? 0.01 : -0.01;
      var rr = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 0) + 128);
      var rg = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 2) + 128);
      var rb = Math.floor(127 * Math.sin(root.rainbowSpeed * hue + 4) + 128);
      ctx.fillStyle = "rgba(" + rr + "," + rg + "," + rb + ")";
    } else {
      ctx.fillStyle =
        "rgba(" +
        root.wavecolor.r +
        "," +
        root.wavecolor.g +
        "," +
        root.wavecolor.b +
        ")";
    }

    ctx.fillText(text, i * font_size, drops[i] * font_size);
    drops[i]++;
    if (drops[i] * font_size > window.innerHeight + 16 && Math.random() > 0.975)
      drops[i] = 0;
  }
}

setInterval(draw, root.matrixspeed);

function livelyPropertyListener(name, val) {
  switch (name) {
    case "matrixColor":
      root.wavecolor = hexToRgb(val);
      break;
    case "rainBow":
      root.rainbow = val;
      break;
    case "rainbowSpeed":
      root.rainbowSpeed = val / 100;
      break;
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
