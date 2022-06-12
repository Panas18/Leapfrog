const random = Math.random()
const container = document.getElementById("container")
const max_height = 500;
const max_width = 1000;




class Ball {
  constructor() {
    this.pos_x = Math.random() * max_width;
    this.pos_y = Math.random() * max_height;
    this.current_x = this.pos_x;
    this.current_y = this.pos_y;
    this.diameter = Math.random() * 100;
    this.color = '#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)
    if (this.diameter < 30) {
      this.diameter = 30
    }

    this.velocity_x = (Math.random() * 11) - 5
    this.velocity_y = (Math.random() * 11) - 5
    this.mass = 6 * this.diameter
    this.center_x = this.current_x + this.diameter / 2
    this.center_y = this.current_y + this.diameter / 2
    this.radius = this.diameter / 2
  };

  create() {
    this.element = document.createElement("div");
    container.appendChild(this.element);

    // if (((max_width - this.pos_x) <= this.diameter) || ((max_height - this.pos_y) <= this.diameter)) {
    //   this.element.parentNode.removeChild(this.element)
    // }

    this.element.style.width = `${this.diameter}px`
    this.element.style.height = `${this.diameter}px`
    this.element.style.position = "absolute"
    this.element.style.top = `${this.pos_y}px`
    this.element.style.left = `${this.pos_x}px`
    this.element.style.backgroundColor = `${this.color}`
    this.element.style.borderRadius = "50%";
  }


  update() {
    this.current_x += this.velocity_x;
    this.current_y += this.velocity_y;
    this.element.style.top = `${this.current_y}px`
    this.element.style.left = `${this.current_x}px`
    this.center_x = this.current_x + this.radius
    this.center_y = this.current_y + this.radius
  }
}


function generate_ball(num) {
  let balls = []
  for (let i = 0; i < num; i++) {
    balls.push(new Ball())
  }

  //regenerate ball when it spawn outside of the container
  function detect_outside_spawn() {
    for (let i = 0; i < balls.length; i++) {
      if (((max_width - balls[i].pos_x) <= balls[i].diameter) || ((max_height - balls[i].pos_y) <= balls[i].diameter)) {
        balls.splice(i, 1)
        detect_outside_spawn()
      }
    }
  }

  //regenerate balls when it overlaps
  function detect_overlap() {
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        let distance = get_distance(
          balls[i].center_x,
          balls[i].center_y,
          balls[j].center_x,
          balls[j].center_y,
        )
        if (distance <= (balls[i].radius + balls[j].radius)) {
          console.log("overlap on generation")
          balls.splice(j, 1)
          detect_overlap()
        }
      }
    }
  }
  detect_outside_spawn()
  detect_overlap()

  return balls
}

const balls = generate_ball(20)

function get_distance(x1, y1, x2, y2) {
  let distance_x = x1 - x2;
  let distance_y = y1 - y2;
  return Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2));
}


function detect_boundry(balls) {
  balls.forEach(ball => {
    if ((ball.current_y <= 0) || ((ball.center_y + ball.radius) > max_height)) {
      ball.velocity_y *= -1
    }

    if ((ball.current_x <= 0) || ((ball.center_x + ball.radius) > max_width)) {
      ball.velocity_x *= -1
    }
  })
}

function change_direction_x(ball1, ball2) {
  v1 = ball1.velocity_x
  v2 = ball2.velocity_x
  ball1.velocity_x = (((ball1.mass - ball2.mass) / (ball1.mass + ball2.mass)) * v1) +
    (((2 * ball2.mass) / (ball1.mass + ball2.mass)) * v2)

  ball2.velocity_x = (((2 * ball1.mass) / (ball1.mass + ball2.mass)) * v1) +
    (((ball2.mass - ball1.mass) / (ball1.mass + ball2.mass)) * v2)
}

function change_direction_y(ball1, ball2) {
  v1 = ball1.velocity_y
  v2 = ball2.velocity_y
  ball1.velocity_y = (((ball1.mass - ball2.mass) / (ball1.mass + ball2.mass)) * v1) +
    (((2 * ball2.mass) / (ball1.mass + ball2.mass)) * v2)

  ball2.velocity_y = (((2 * ball1.mass) / (ball1.mass + ball2.mass)) * v1) +
    (((ball2.mass - ball1.mass) / (ball1.mass + ball2.mass)) * v2)
}



function detect_collision(balls) {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let distance = get_distance(
        balls[i].center_x,
        balls[i].center_y,
        balls[j].center_x,
        balls[j].center_y,
      )
      if (distance <= (balls[i].radius + balls[j].radius)) {
        change_direction_x(balls[i], balls[j])
        change_direction_y(balls[i], balls[j])
      }
    }
  }
}


balls.forEach(ball => ball.create());

function play() {
  detect_collision(balls)
  detect_boundry(balls)
  balls.forEach(ball => ball.update())
  window.requestAnimationFrame(() => play())
}

 play()

