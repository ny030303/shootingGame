import {Patterns} from "../Patterns";

export default class Extra {
  constructor(parent) {
    this.parent = parent;
    this.x = null;
    this.y = null;
    this.w = null;
    this.h = null;
    this.img = null;
    this.active = false;
    this.playTm = null;
  }

  reset(x, y, w, h, img, data) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.active = true;
    this.playTm = null;
    this.data = Object.assign({}, data);
  }

  update(d) {
    if (!this.active) return;
    if (this.startTm == null) this.startTm = 0;

    // vector 사용 X, 패턴으로 변경
    let pt = this.data.reverse ? Patterns.list[this.data.pattern].getReversePoint(this.playTm) : Patterns.list[this.data.pattern].getPoint(this.playTm);
    if (pt == null) { // 종료
      this.active = false;
    } else { // 베지어 곡선 이동
      this.x = pt.x - (this.w / 2);
      this.y = pt.y;
      this.playTm += 0.01;

    }
  }

  render(ctx) {
    if (!this.active) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    ctx.restore();
  }
}