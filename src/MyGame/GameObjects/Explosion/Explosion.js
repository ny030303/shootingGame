export class Explosion {

  constructor(parent, img, effect) {
    this.parent = parent;
    this.x = null;
    this.y = null;
    this.w = null;
    this.h = null;
    this.img = img;
    this.now = 0;
    this.duration = 1.2;
    this.idx = 0;
    this.active = false;
    this.isPlayer = false; // 안씀
    this.effect = effect;
    this.audio = new Audio();
    this.audio.src = "mp3/explodeEffect.mp3";
  }

  setActive(x, y, w, h, isPlayer) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isPlayer = isPlayer;
    this.active = true;
    this.now = 0;
    this.audio.play();
  }

  update(d) {
    if (!this.active) return;
    this.now += d;
    this.idx = Math.floor(24 * this.now / this.duration);
    if (this.now > this.duration) {
      this.active = false;
    }
  }

  render(ctx) {
    if (!this.active) return;
    let sx = this.idx % 5 * 64;
    let sy = Math.floor(this.idx / 5) * 64;

    ctx.drawImage(
      this.img, sx, sy, 64, 64,
      this.x, this.y, this.w, this.h);

    // if (this.effect) {
    //   let effectIdx = Math.floor(this.idx / 8);
    //   console.log("effectIdx:", effectIdx);
    //   if (effectIdx < Explosion.effectFrams.length) {
    //     if (effectIdx === 0) {
    //       let audio = new Audio();
    //       audio.src = "mp3/shipDestroyEffect.mp3";
    //       audio.play();
    //     }
    //     let frame = Explosion.effectFrams[effectIdx];
    //     ctx.save();
    //     ctx.globalCompositeOperation = "lighten";
    //     ctx.drawImage(
    //       Explosion.effectImage, frame.x, frame.y, frame.w, frame.h,
    //       this.x - (96 * 4 / 2 - this.w), this.y - (96 * 4 / 2 - this.h), 96 * 4, 96 * 4);
    //     ctx.restore();
    //   }
    // }
  }
}
