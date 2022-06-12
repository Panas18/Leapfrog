
window.addEventListener('resize', () => {
  maxHeight = window.innerHeight - offset
  maxWidth = window.innerWidth - offset
  container.style.height = maxHeight + "px"
  container.style.width = maxWidth + "px"
})

const balls = generate_ball(100)
balls.forEach(ball => ball.create());

function play() {
  balls.forEach(ball => ball.update())
  detect_collision(balls)
  detect_boundry(balls)
  window.requestAnimationFrame(() => play())
}

play()

