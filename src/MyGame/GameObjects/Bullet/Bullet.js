import {isOverlapedRect, makeBulletImage} from "../CollisionUtils";
import {Patterns} from "../Patterns";

import {checkCollision, getCollisionPoint} from "../CollisionUtils";

export class Bullet {

  constructor(parent, img) {
    this.parent = parent;
    this.x = null;
    this.y = null;
    this.r = 3;
    this.w = img.width;
    this.h = img.height;
    this.img = img;
    this.speed = null;
    this.vector = null;
    this.active = false;
    this.damage = 100;
    this.isPlayer = false;
    this.stageData = null;
    this.playTm = null;
  }

  setActive(x, y, s, v, isPlayer = false, stageData = null) {
    this.x = x;
    this.y = y;
    this.speed = s;
    this.vector = v;
    this.active = true;
    this.isPlayer = isPlayer;
    this.stageData = stageData;
    this.playTm = null;
  }

  update(d) {
    if (!this.active) return;
    if (this.startTm == null) this.startTm = 0;
    let pt = null;

    // vector 사용 X, 패턴으로 변경
    if (this.stageData !== null) {
      pt = this.stageData.reverse ? Patterns.list[this.stageData.pattern].getReversePoint(this.playTm) : Patterns.list[this.stageData.pattern].getPoint(this.playTm);
    }

    if (pt == null) { // 직선 이동
      if (this.stageData !== null && this.stageData.loop) {
        this.playTm = 0;
      }
      else {
        let normal = this.vector.normalize();
        this.x += normal.x * d * this.speed;
        this.y += normal.y * d * this.speed;
      }
    }
    else { // 베지어 곡선 이동
      this.x = pt.x - (this.w / 2);
      this.y = pt.y;
      this.playTm += 0.01;

    }
    // 화면밖 검사
    if (!isOverlapedRect({x: 0, y: 0, w: this.parent.canvasWidth, h: this.parent.canvasHeight}, this)) {
      this.active = false;
    }
  }

  checkIsHit(target, main) {
    // 부딪힘 체크
    let point = getCollisionPoint(this, target, true);
    console.log(checkCollision(this, target));
    if (point !== null) {
      main.player.setDamage(100);
      main.player.downgrade();
      // youObj.active = false;
      main.createExplosion(point.x, point.y, 1, 'hitExp');
      if (main.player.isPlayerDied) {
        setTimeout(() => {
          main.stageClear();
          main.gameOver = true;
        }, 500);
      }
      return true;
    } 
    return false;
  }

  getIsHitJson() {
    return {
        x: this.x, y: this.y, w: this.w, h: this.h, // destination image position
        frame: [0, 0, this.img.width, this.img.height],
        image: this.img
    }
  }

  render(ctx) {
    if (!this.active) return;

    ctx.drawImage(this.img, this.x, this.y);
  }
}
