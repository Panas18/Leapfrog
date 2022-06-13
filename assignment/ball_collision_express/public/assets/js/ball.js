class Ball {
  constructor() {
    this.x = genRandom(minSpawnWidth, maxSpawnWidth);
    this.y = genRandom(minSpawnHeight, maxSpawnHeight);
    this.currentX =this.x;
    this.currentY = this.y;
    this.diameter = genRandom(minDiameter, maxDiameter);
    this.color = "#" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16);
    this.mass = massFactor * Math.pow(this.diameter, 2);

    this.velocityX = genRandom(-maxVelocity, maxVelocity);
    this.velocityY = genRandom(-maxVelocity, maxVelocity);
    this.radius = this.diameter / 2;
    this.centerX = this.currentX + this.radius;
    
  }

  create() {
    this.element = document.createElement("div");
    container.appendChild(this.element);

    this.element.style.width = `${this.diameter}px`;
    this.element.style.height = `${this.diameter}px`;
    this.element.style.position = "absolute";
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
    this.element.style.backgroundColor = `${this.color}`;
    this.element.style.borderRadius = "50%";
  }

  update() {
    this.currentX += this.velocityX;
    this.currentY += this.velocityY;
    this.element.style.top = `${this.currentY}px`;
    this.element.style.left = `${this.currentX}px`;
    this.centerX = this.currentX + this.radius;
    this.centerY = this.currentY + this.radius;
  }
}
