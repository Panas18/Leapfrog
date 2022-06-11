const random = Math.random()
const container = document.getElementById("container")
const max_height = 500;
const max_width = 1000;
const fps = 60
const colors = ['red', 'blue', 'green', 'pink', 'purple', 'orange', 'yellow', 'magenta', 'black', 'brown', 'cyan']




class Ball {
  constructor() {
    this.pos_x = Math.random() * max_width;
    this.pos_y = Math.random() * max_height;
    this.diameter = Math.random() * 100;
    this.color = colors[Math.floor(Math.random() * colors.length)]
    if (this.diameter < 30) {
      this.diameter = 30
    }
    if ((this.pos_x + this.diameter) >= max_width) {
      this.pos_x -= this.diameter
    }
    if ((this.pos_y + this.diameter) >= max_height) {
      this.pos_y -= this.diameter
    }
    this.current_x = this.pos_x;
    this.current_y = this.pos_y;
    this.velocity_x = (Math.random() * 21) - 10
    this.velocity_y = (Math.random() * 21) - 10


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

    this.element.style.width = `${this.diameter}px`
    this.element.style.height = `${this.diameter}px`
    this.element.style.position = "absolute"
    this.element.style.top = `${this.pos_y}px`
    this.element.style.left = `${this.pos_x}px`
    this.element.style.backgroundColor = `${this.color}`
    this.element.style.borderRadius = "50%";
  }


  update() {
    setInterval(() => {
      this.current_x += this.velocity_x;
      this.current_y += this.velocity_y;
      this.element.style.top = `${this.current_y}px`
      this.element.style.left = `${this.current_x}px`
      this.center_x = this.current_x + (this.radius)
      this.center_y = this.current_y + (this.radius)
      this.detect_boundry()
    }, 1000 / fps);
  }
}


function generate_ball(num = 2) {
  let balls = []
  for (let i = 0; i < num; i++) {
    balls.push(new Ball())
  }
  return balls
}


const balls = generate_ball(10)
balls.forEach(ball=> ball.create());
balls.forEach(ball => ball.update())