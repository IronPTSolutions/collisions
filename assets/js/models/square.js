class Square {

  constructor(ctx, x, y, floor, src) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.w = SQUARE_H;
    this.h = SQUARE_H;

    this.vx = 0;
    this.vy = 0;
    this.ay = 0;

    this.floor = floor;

    this.isJumping = false;

    this.sprite = new Image();
    this.sprite.src = src;
    this.sprite.onload = () => {
      this.sprite.isLoaded = true;
    }
  }

  onKeyDown(event) {
    const key = event.keyCode;
    switch (key) {
      case KEY_RIGHT:
        this.vx = SQUARE_X_SPEED;
        break;
      case KEY_LEFT:
        this.vx = -SQUARE_X_SPEED;
        break;
      case KEY_UP:
        if (!this.isJumping) {
          this.vy = -SQUARE_Y_JUMP;
          this.ay = 1;
          this.isJumping =  true;
        }
        break;
      default:
        break;
    }
  }

  onKeyUp(event) {
    const key = event.keyCode;
    switch (key) {
      case KEY_RIGHT:
      case KEY_LEFT:
        this.vx = 0;
        break;
      default:
        break;
    }
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.ay;

    if (this.y + this.h >= this.floor) {
      this.y = this.floor - this.h;
      this.isJumping = false;
      this.vy = 0;
      this.ay = 0;
    }
  }

  collidesWith(element) {
    return this.x <= element.x + element.w &&
      this.x + this.w >= element.x &&
      this.y <= element.y + element.h &&
      this.y + this.h >= element.y;
  }

  isUpCollision(element) {
    return this.collidesWith(element) &&
      this.y < element.y && 
        this.y + this.h >= element.y;
  }

  isRightCollision(element) {
    return this.collidesWith(element) && 
      this.x + this.w > element.x && 
      this.x <= element.x;
  }

  isLeftCollision(element) {
    return this.collidesWith(element) && 
      element.x + element.w > this.x &&
      element.x <= this.x;
  }

  draw() {
    if (this.sprite.isLoaded) {
      this.ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
  }

}