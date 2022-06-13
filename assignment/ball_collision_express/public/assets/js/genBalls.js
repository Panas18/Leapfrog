function generateBall(num) {
  let balls = []
  for (let i = 0; i < num; i++) {
    balls.push(new Ball())
  }

  //regenerate balls when it overlaps
  function detectOverlap() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        let distance = getDistance(balls[i], balls[j])
        if (distance <= (balls[i].radius + balls[j].radius)) {
          console.log("overlap on generation")
          balls.splice(j, 1)
          balls.push(new Ball())
          detectOverlap()
        }
      }
    }
  }

  detectOverlap()

  return balls
}