const scratter_plot = document.getElementById("scratterPlot");
const ball_container = document.getElementById("bounce_ball")

const fps = 60;

class plotter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  render() {
    const dot = document.createElement("div");
    scratter_plot.appendChild(dot);
    dot.style.position = "absolute"
    dot.style.width = "15px";
    dot.style.height = "15px";
    dot.style.backgroundColor = "blue";
    dot.style.top = `${this.y}px`;
    dot.style.left = `${this.x}px`;
    dot.style.borderRadius = "50%";
    dot.addEventListener("click", (e) => {
      dot.style.display = "none"
    })
  }
}


let i = 10;
while (i > 0) {
  let x_cord = Math.floor(Math.random() * 800 - 15)
  let y_cord = Math.floor(Math.random() * 300 - 15)
  const point = new plotter(x_cord, y_cord)
  point.render();
  i -= 1;
}


class bounceBall {

  constructor() {
    this.x = 400;
    this.y = 0;
    this.w = 60;
    this.h = 60;
    this.current_y = this.y
    this.current_x = this.x
    this.velocity_y = 5;
    this.velocity_x = 5
  }

  create_ball() {
    this.ball = document.createElement("div");
    ball_container.appendChild(this.ball);
    this.ball.style.position = "absolute"
    this.ball.style.width = `${this.w}px`;
    this.ball.style.height = `${this.h}px`;
    this.ball.style.bottom = `${this.y}px`;
    this.ball.style.left = `${this.x}px`;
    this.ball.style.backgroundColor = "blue"
    this.ball.style.borderRadius = "50%"
  }

  move_ball() {
    setInterval(() => {
      if (this.current_y >= 300 - this.w || this.current_y < 0) {
        this.velocity_y *= -1;
      }

      if (this.current_x >= 800 - this.w || this.current_x < 0) {
        this.velocity_x *= -1;
      }
      this.current_y += this.velocity_y;
      this.current_x += this.velocity_x
      this.ball.style.bottom = `${this.current_y}px`
      this.ball.style.left = `${this.current_x}px`
    }, 1000 / fps);

  }

}

const ball = new bounceBall()
ball.create_ball()
ball.move_ball()