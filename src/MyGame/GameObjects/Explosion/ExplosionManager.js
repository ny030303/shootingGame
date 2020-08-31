import {Explosion} from "./Explosion";
import {HLookExplosion} from "./HLookExplosion";
import {loadImage} from "../GameUtils";

export default class ExplosionManager {

  constructor(parent, imgs) {
    this.parent = parent;

    Explosion.effectImage = new Image();
    Explosion.effectImage.src = "images/textureOpaquePack.png";
    Explosion.effectFrams = [
      {x: 100, y: 2, w: 96, h: 96},
      {x: 2, y: 100, w: 96, h: 96},
      {x: 2, y: 2, w: 96, h: 96}
    ];

    this.explosions = {
      defExp: {image: imgs[0], list: []},
      iceExp: {image: imgs[1], list: []},
      fireExp: {image: imgs[2], list: []},
      hitExp: {image: imgs[3], list: []}
    };
  }

  getExplosionCount = () => this.explosions['defExp'].list.filter(v => v.active).length;

  createExplosion(x, y, scale, type = 'defExp') {
    let w = 16;
    let h = 16;
    let list = this.explosions[type].list;
    let exp = list.find(x => !x.active);
    if( type !== "hitExp") {
      console.log("createExplosion:", x, y, scale, type);
    }
    if( exp === undefined) {
      switch(type) {
        case 'iceExp':
        case 'fireExp':
          w = this.explosions[type].height;
          h = this.explosions[type].height;
          exp = new HLookExplosion(this.explosions[type].image, 40, 1, w, h);
          break;
        case 'defExp' :
          w = 40 * scale;
          h = 40 * scale;
          exp = new Explosion(this, this.explosions[type].image, scale > 1.1);
          break;
        case 'hitExp':
          exp = new HLookExplosion(this.explosions[type].image, 5, 0.5, w, h);
          break;
        default:
          exp = new Explosion(this.explosions.explosion);
          break;
      }
      list.push(exp);
    }
    else {
      w = exp.w;
      h = exp.h;
    }
    exp.setActive(x - Math.floor(w / 2), y - Math.floor(h / 2), w, h, false);
  }

  clear() {
    Object.keys(this.explosions).forEach(key => {
      this.explosions[key].list.forEach(e => e.active = false);
    });
  }

  update(delta) {
    //폭팔 업데이트
    Object.keys(this.explosions).forEach(key => {
      this.explosions[key].list.forEach(e => e.update(delta));
    });
  }

  render() {
    Object.keys(this.explosions).forEach(key => {
      this.explosions[key].list.forEach(e => e.render(this.parent.ctx));
    });
  }
}
