class Ball {
  constructor() {
    this.pos_x = genRandom(minSpawnWidth, maxSpawnWidth)
    this.pos_y = genRandom(minSpawnHeight, maxSpawnHeight)
    this.current_x = this.pos_x;
    this.current_y = this.pos_y;
    this.diameter = genRandom(minDiameter, maxDiameter)
    this.color = '#' + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)
    this.mass = massFactor * Math.pow(this.diameter, 2)

    this.velocity_x = genRandom(-maxVelocity, maxVelocity)
    this.velocity_y = genRandom(-maxVelocity, maxVelocity)
    this.radius = this.diameter / 2
    this.center_x = this.current_x + this.radius
    this.center_y = this.current_y + this.radius
  };

  create() {
    this.element = document.createElement("div")
    container.appendChild(this.element)

    this.element.style.width = `${this.diameter}px`
    this.element.style.height = `${this.diameter}px`
    this.element.style.position = "absolute"
    this.element.style.top = `${this.pos_y}px`
    this.element.style.left = `${this.pos_x}px`
    this.element.style.backgroundColor = `${this.color}`
    this.element.style.borderRadius = "50%"
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