class Game {

  constructor(canvasId, collisionTextContainerId) {
    this.canvas = document.getElementById(canvasId);
    this.collisionTextContainerId = collisionTextContainerId;

    this.canvas.width = window.innerWidth - 100;

    this.ctx = this.canvas.getContext('2d');

    this.intervalId = undefined;
    this.fps = 1000 / 60;

    this.background = new Background(this.ctx, 'assets/img/backgrounds/bg-1.webp');
    this.floor = this.canvas.height - 42;
    this.square = new Square(this.ctx, 10, this.floor - SQUARE_H, this.floor, 'assets/img/cubes/player.png');
    this.obstacles = [
      new Square(this.ctx, 200, this.floor - SQUARE_H, this.floor, 'assets/img/cubes/enemy.png')
    ]
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.clear();
        this.move();
        this.checkCollisions();
        this.draw();
      }, this.fps)
    }
  }

  onKeyUp(event) {
    this.square.onKeyUp(event);
  }

  onKeyDown(event) {
    this.square.onKeyDown(event);
  }

  updateCollisionStatus(position) {
    const collidesContainer = document.getElementById(this.collisionTextContainerId);
    if (!position) {
      collidesContainer.innerText = 'Non collision';
      collidesContainer.setAttribute('class', 'text-success');
    } else {
      collidesContainer.innerText = `${position} collision`;
      if (position === 'UP') {
        collidesContainer.setAttribute('class', 'text-info');
      } else {
        collidesContainer.setAttribute('class', 'text-danger');
      }
    }
  }

  checkCollisions() {
    const anyCollision = this.obstacles.some((obstacle) => {
      if (this.square.collidesWith(obstacle)) {
        if (this.square.isUpCollision(obstacle)) {
          this.square.floor = obstacle.y;
          this.updateCollisionStatus('UP');
        } else if (this.square.isRightCollision(obstacle)) {
          this.square.x = obstacle.x - this.square.w;
          this.updateCollisionStatus('RIGHT');
        } else if (this.square.isLeftCollision(obstacle)) {
          this.square.x = obstacle.x + obstacle.w;
          this.updateCollisionStatus('LEFT');
        }
        return true;
      } else {
        return false;
      }
    });

    if (!anyCollision) {
      this.updateCollisionStatus();
      this.square.floor = this.floor;
      this.square.ay = 1;
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move() {
    this.background.move();
    this.square.move();
  }

  draw() {
    this.background.draw();
    this.square.draw();
    this.obstacles.forEach((obstacle) => obstacle.draw());
  }
  
}