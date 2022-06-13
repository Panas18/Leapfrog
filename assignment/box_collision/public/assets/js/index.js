window.addEventListener("resize", () => {
  maxHeight = window.innerHeight - offset;
  maxWidth = window.innerWidth - offset;
  container.style.height = maxHeight + "px";
  container.style.width = maxWidth + "px";
});

const balls = generateBall(200);
balls.forEach((ball) => ball.create());

function play() {
  balls.forEach((ball) => ball.update());
  detectCollision(balls);
  detectBoundry(balls);
  window.requestAnimationFrame(() => play());
}

play();
