const random = Math.random()
const container = document.getElementById("container")
const max_height = 500;
const max_width = 1000;
const colors = ['red', 'blue', 'green', 'pink', 'purple', 'orange', 'yellow', 'magenta', 'black', 'brown', 'cyan']




class Ball {
  constructor() {
    this.pos_x = Math.random() * max_width;
    this.pos_y = Math.random() * max_height;
    this.current_x = this.pos_x;
    this.current_y = this.pos_y;
    this.diameter = Math.random() * 100;
    this.color = colors[Math.floor(Math.random() * colors.length)]
    if (this.diameter < 30) {
      this.diameter = 30
    }

    this.velocity_x = (Math.random() * 21) - 10
    this.velocity_y = (Math.random() * 21) - 10
    this.mass = 3 * this.diameter

    this.center_x = this.current_x + this.diameter / 2
    this.center_y = this.current_y + this.diameter / 2

    this.radius = this.diameter / 2

    this.detect_boundry = () => {
      if (((this.center_y - this.radius) <= 0) || ((this.center_y + this.radius) >= max_height)) {
        this.velocity_y *= -1
      }

      if (((this.center_x - this.radius) <= 0) || ((this.center_x + this.radius) >= max_width)) {
        this.velocity_x *= -1
      }
    }
  };

  create() {
    this.element = document.createElement("div");
    container.appendChild(this.element);

    if ((max_width- this.pos_x) <= this.diameter) {
      this.pos_x -= 150
    }

    if ((max_height- this.pos_y) <= this.diameter) {
      this.pos_y -= 150
    }

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
    this.center_x = this.current_x + this.diameter / 2
    this.center_y = this.current_y + this.diameter / 2
    this.detect_boundry()
  }
}


function generate_ball(num = 2) {
  let balls = []
  for (let i = 0; i < num; i++) {
    balls.push(new Ball())
  }
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let distance = get_distance(
        balls[i].center_x,
        balls[i].center_y,
        balls[j].center_x,
        balls[j].center_y,
      )
      if (distance <= (balls[i].radius + balls[j].radius)) {
        console.log("overlap detected")
        // balls.splice(j, 1)
        // generate_ball(num - balls.length)
      }
    }
  }

  return balls
}

const balls = generate_ball(10)

function get_distance(x1, y1, x2, y2) {
  let distance_x = x1 - x2;
  let distance_y = y1 - y2;
  return Math.sqrt(Math.pow(distance_x, 2) + Math.pow(distance_y, 2));
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
  balls.forEach(ball => ball.update())
  detect_collision(balls)
  window.requestAnimationFrame(() => play())
}

// play()

