let slides = document.querySelectorAll(".slide");
let current = 0;

function nextSlide() {
  slides[current].classList.remove("active");
  current++;
  if (slides[current]) slides[current].classList.add("active");
}

/* MUSIC */
function startMusic() {
  const music = document.getElementById("bgMusic");
  music.volume = 0.35;
  music.play();
}

/* BALLOONS */
const balloonBox = document.getElementById("balloons");
const colors = ["#ff6f91", "#ff9671", "#ffc75f", "#d65db1"];

function randomBalloon() {
  const b = document.createElement("div");
  b.className = "balloon";
  b.style.color = colors[Math.floor(Math.random() * colors.length)];
  b.style.left = Math.random() * 100 + "vw";
  b.style.top = innerHeight + "px";
  b.style.animationDuration = (9 + Math.random() * 6) + "s";
  balloonBox.appendChild(b);
  setTimeout(() => b.remove(), 16000);
}
setInterval(randomBalloon, 2200);

/* TAP EXTRA BLAST */
function tapBlast() {
  for (let i = 0; i < 15; i++) randomBalloon();
  firework();
}

/* CONFETTI */
const c = document.getElementById("confetti");
const ctx = c.getContext("2d");

function resizeConfetti() {
  c.width = innerWidth;
  c.height = innerHeight;
}
resizeConfetti();
window.addEventListener("resize", resizeConfetti);

let confetti = Array.from({ length: 180 }, () => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height,
  r: Math.random() * 5 + 2,
  d: Math.random() * 4 + 2
}));

setInterval(() => {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "#ffb3c6";
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.d;
    if (p.y > c.height) p.y = 0;
  });
}, 35);

/* FIREWORKS */
const fireCanvas = document.getElementById("fireworks");
const fx = fireCanvas.getContext("2d");

function resizeFire() {
  fireCanvas.width = innerWidth;
  fireCanvas.height = innerHeight;
}
resizeFire();
window.addEventListener("resize", resizeFire);

function firework() {
  const x = Math.random() * fireCanvas.width;
  const y = Math.random() * fireCanvas.height / 2;
  let particles = [];

  for (let i = 0; i < 35; i++) {
    particles.push({
      x, y,
      vx: Math.random() * 5 - 2.5,
      vy: Math.random() * 5 - 2.5,
      life: 55,
      color: `hsl(${Math.random() * 360},100%,70%)`
    });
  }

  function animate() {
    fx.clearRect(0, 0, fireCanvas.width, fireCanvas.height);
    particles.forEach((p, i) => {
      fx.fillStyle = p.color;
      fx.beginPath();
      fx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      fx.fill();
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    });
    if (particles.length) requestAnimationFrame(animate);
  }
  animate();
}

setInterval(firework, 3800);