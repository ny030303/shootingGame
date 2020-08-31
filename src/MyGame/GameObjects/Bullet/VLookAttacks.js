import {Bullet} from "./Bullet";
import {isOverlapedRect} from "../CollisionUtils";
import {Patterns} from "../Patterns";
import {Vector} from "../Vector";

export class VLookAttacks { // extends Bullet {
  constructor(parent, img, duration, imgW, imgH) {
    this.parent = parent;
    this.x = null;
    this.y = null;
    this.w = imgW;
    this.h = imgH; // display size
    this.img = img;
    this.nowTm = 0;
    this.duration = duration;
    this.idx = 0;
    this.active = false;
    this.frame = Math.floor(img.height / img.width); // frame count
    this.isLoop = true;
    this.imgW = imgW; // cut image size
    this.imgH = imgH; // cut image size
    this.vector = null;
    this.speed = null;
    this.damage = 2;
    this.isPlayer = false;
    this.pattern = null;
    this.playTm = null;
  }

  setActive(x, y, s, v, isPlayer = false, pattern) {
    if (!this.active) {
      this.x = x;
      this.y = y;
      this.active = true;
      this.nowTm = 0;
      this.vector = v || new Vector(0, 1);
      this.speed = s;
      this.isPlayer = isPlayer;
      this.pattern = pattern;
      this.playTm = null;
    }
  }

  update(d) {
    if (!this.active) return;
    if (this.startTm == null) this.startTm = 0;
    let pt = null;

    // vector 사용 X, 패턴으로 변경

     if (this.pattern) {
      let patten = Patterns.list[this.pattern];
      pt = this.pattern.reverse ? patten.getReversePoint(this.playTm) : patten.getPoint(this.playTm);
      if (pt == null ) { // 베지어 곡선 이동 (time 값에 따라 이동)
        this.x = pt.x - (this.w / 2);
        this.y = pt.y;
        this.playTm += 0.01;
      }
      else {
        if( this.pattern.loop ) {
          this.playTm = 0;
        }
        else {
          this.active = false;
        }
      }
    }
    else {// 직선 이동
      let normal = this.vector.normalize();
      this.x += normal.x * d * this.speed;
      this.y += normal.y * d * this.speed;
      // 화면밖 검사
      if (!isOverlapedRect({x: 0, y: 0, w: this.parent.canvasWidth, h: this.parent.canvasHeight}, this)) {
        this.active = false;
      }
    }

    if (this.nowTm > this.duration) {
      if (this.isLoop) {
        this.nowTm = 0;
      }
      else {
        this.active = false;
      }
    }
  }

  render(ctx) {
    // console.log("active: ", this.active);
    if (!this.active) return;
    let sx = Math.floor(this.idx / this.frame) * this.imgW;
    let sy = this.idx % this.frame * this.imgH;

    ctx.drawImage(
      this.img, sx, sy, this.imgW, this.imgH,
      this.x, this.y, this.w, this.h);
  }
}