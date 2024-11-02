class Background {

  constructor(ctx, src) {
    this.ctx = ctx;

    this.x = 0;
    this.y = 0;

    this.w = this.ctx.canvas.width;
    this.h = this.ctx.canvas.height;

    this.vx = 0;

    this.sprite = new Image();
    this.sprite.src = src;
    this.sprite.onload = () => {
      this.sprite.isLoaded = true;
    }
  }

  move() {
    this.x -= this.vx;
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