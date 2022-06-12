function get_distance(ball1, ball2) {
  let x1 = ball1.center_x
  let y1 = ball1.center_y
  let x2 = ball2.center_x
  let y2 = ball2.center_y
  let distance_x = x1 - x2;
  let distance_y = y1 - y2;
  return Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2));
}


function detect_boundry(balls) {
  balls.forEach(ball => {
    if ((ball.current_y <= 0) || ((ball.center_y + ball.radius) > maxHeight)) {
      ball.velocity_y *= -1
    }

    if ((ball.current_x <= 0) || ((ball.center_x + ball.radius) > maxWidth)) {
      ball.velocity_x *= -1
    }
  })
}


function penetration_dist(ball1, ball2) {
  return (ball1.radius + ball2.radius - get_distance(ball1, ball2))

}

// function elasticCollision(ball1, ball2, v1, v2) {
// 	v1 = ((((ball1.mass - ball2.mass) / (ball1.mass + ball2.mass)) * v1) +
// 		(((2 * ball2.mass) / (ball1.mass + ball2.mass)) * v2))

// 	v2 = ((((2 * ball1.mass) / (ball1.mass + ball2.mass)) * v1) +
// 		(((ball2.mass - ball1.mass) / (ball1.mass + ball2.mass)) * v2))

// 	return [v1, v2]
// }

// function change_direction(ball1, ball2) {

// 	[ball1.velocity_x, ball2.velocity_x] = elasticCollision(ball1, ball2, ball1.velocity_x, ball2.velocity_x)
// 	[ball1.velocity_y, ball2.velocity_y] = elasticCollision(ball1, ball2, ball1.velocity_y, ball2.velocity_y)


// 	pen_dist = penetration_dist(ball1, ball2)
// 	ball1.current_x = ball1.current_x + Math.sign(ball1.velocity_x) * (pen_dist / 4)
// 	ball2.current_x = ball2.current_x + Math.sign(ball2.velocity_x) * (pen_dist / 4)
// 	ball1.current_y = ball1.current_y + Math.sign(ball1.velocity_y) * (pen_dist / 4)
// 	ball2.current_y = ball2.current_y + Math.sign(ball2.velocity_y) * (pen_dist / 4)
// }


function change_direction_x(ball1, ball2) {
  v1 = ball1.velocity_x
  v2 = ball2.velocity_x
  pen_dist = penetration_dist(ball1, ball2)
  ball1.velocity_x = ((((ball1.mass - ball2.mass) / (ball1.mass + ball2.mass)) * v1) +
    (((2 * ball2.mass) / (ball1.mass + ball2.mass)) * v2))
  ball2.velocity_x = ((((2 * ball1.mass) / (ball1.mass + ball2.mass)) * v1) +
    (((ball2.mass - ball1.mass) / (ball1.mass + ball2.mass)) * v2))
  ball1.current_x = ball1.current_x + Math.sign(ball1.velocity_x) * pen_dist / 4
  ball2.current_x = ball2.current_x + Math.sign(ball2.velocity_x) * pen_dist / 4
}
function change_direction_y(ball1, ball2) {
  v1 = ball1.velocity_y
  v2 = ball2.velocity_y
  pen_dist = penetration_dist(ball1, ball2)
  ball1.velocity_y = ((((ball1.mass - ball2.mass) / (ball1.mass + ball2.mass)) * v1) +
    (((2 * ball2.mass) / (ball1.mass + ball2.mass)) * v2))
  ball2.velocity_y = ((((2 * ball1.mass) / (ball1.mass + ball2.mass)) * v1) +
    (((ball2.mass - ball1.mass) / (ball1.mass + ball2.mass)) * v2))
  ball1.current_y = ball1.current_y + Math.sign(ball1.velocity_y) * pen_dist / 4
  ball2.current_y = ball2.current_y + Math.sign(ball2.velocity_y) * pen_dist / 4
}


function detect_collision(balls) {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let distance = get_distance(balls[i], balls[j])
      if (distance <= (balls[i].radius + balls[j].radius)) {
        change_direction_x(balls[i], balls[j])
        change_direction_y(balls[i], balls[j])
        // change_direction(balls[i], balls[j])
      }
    }
  }
}