function getDistance(ball1, ball2) {
  let x1 = ball1.centerX;
  let y1 = ball1.centerY;
  let x2 = ball2.centerX;
  let y2 = ball2.centerY;
  let distance_x = x1 - x2;
  let distance_y = y1 - y2;
  return Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2));
}

function detectBoundry(balls) {
  balls.forEach((ball) => {
    if (ball.currentY <= 0 || ball.centerY + ball.radius > maxHeight) {
      ball.velocityY *= -1;
    }

    if (ball.currentX <= 0 || ball.centerX + ball.radius > maxWidth) {
      ball.velocityX *= -1;
    }
  });
}

function penDistance(ball1, ball2) {
  return ball1.radius + ball2.radius - getDistance(ball1, ball2);
}

// function elasticCollisionball1, ball2, v1, v2) {
// 	v1 = ((((ball1.mass - ball2.mass) / (ball1.mass + ball2.mass)) * v1) +
// 		(((2 * ball2.mass) / (ball1.mass + ball2.mass)) * v2))

// 	v2 = ((((2 * ball1.mass) / (ball1.mass + ball2.mass)) * v1) +
// 		(((ball2.mass - ball1.mass) / (ball1.mass + ball2.mass)) * v2))

// 	return [v1, v2]
// }

// function change_direction(ball1, ball2) {

// 	[ball1.velocityX, ball2.velocityX] = elasticCollision(ball1, ball2, ball1.velocityX, ball2.velocityX)
// 	[ball1.velocityY, ball2.velocityY] = elasticCollision(ball1, ball2, ball1.velocityY, ball2.velocityY)

// 	penDist = penDistance(ball1, ball2)
// 	ball1.currentX = ball1.currentX + Math.sign(ball1.velocityX) * (penDist / 4)
// 	ball2.currentX = ball2.currentX + Math.sign(ball2.velocityX) * (penDist / 4)
// 	ball1.currentY = ball1.currentY + Math.sign(ball1.velocityY) * (penDist / 4)
// 	ball2.currentY = ball2.currentY + Math.sign(ball2.velocityY) * (penDist / 4)
// }

function change_direction_x(ball1, ball2) {
  v1 = ball1.velocityX;
  v2 = ball2.velocityX;
  penDist = penDistance(ball1, ball2);
  ball1.velocityX =
    ((ball1.mass - ball2.mass) / (ball1.mass + ball2.mass)) * v1 +
    ((2 * ball2.mass) / (ball1.mass + ball2.mass)) * v2;
  ball2.velocityX =
    ((2 * ball1.mass) / (ball1.mass + ball2.mass)) * v1 +
    ((ball2.mass - ball1.mass) / (ball1.mass + ball2.mass)) * v2;
  ball1.currentX =
    ball1.currentX + (Math.sign(ball1.velocityX) * penDist) / 4;
  ball2.currentX =
    ball2.currentX + (Math.sign(ball2.velocityX) * penDist) / 4;
}
function change_direction_y(ball1, ball2) {
  v1 = ball1.velocityY;
  v2 = ball2.velocityY;
  penDist = penDistance(ball1, ball2);
  ball1.velocityY =
    ((ball1.mass - ball2.mass) / (ball1.mass + ball2.mass)) * v1 +
    ((2 * ball2.mass) / (ball1.mass + ball2.mass)) * v2;
  ball2.velocityY =
    ((2 * ball1.mass) / (ball1.mass + ball2.mass)) * v1 +
    ((ball2.mass - ball1.mass) / (ball1.mass + ball2.mass)) * v2;
  ball1.currentY =
    ball1.currentY + (Math.sign(ball1.velocityY) * penDist) / 4;
  ball2.currentY =
    ball2.currentY + (Math.sign(ball2.velocityY) * penDist) / 4;
}

function detectCollision(balls) {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let distance = getDistance(balls[i], balls[j]);
      if (distance <= balls[i].radius + balls[j].radius) {
        change_direction_x(balls[i], balls[j]);
        change_direction_y(balls[i], balls[j]);
        // change_direction(balls[i], balls[j])
      }
    }
  }
}
