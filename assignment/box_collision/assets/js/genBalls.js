function generate_ball(num) {
  let balls = []
  for (let i = 0; i < num; i++) {
    balls.push(new Ball())
  }

  //regenerate balls when it overlaps
  function detect_overlap() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        let distance = get_distance(balls[i], balls[j])
        if (distance <= (balls[i].radius + balls[j].radius)) {
          console.log("overlap on generation")
          balls.splice(j, 1)
          balls.push(new Ball())
          detect_overlap()
        }
      }
    }
  }

  detect_overlap()

  return balls
}