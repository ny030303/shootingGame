import {VLookAttacks} from "./VLookAttacks";
import {Bullet} from "./Bullet";
import {checkCollision, getCollisionPoint, makeBulletImage} from "../CollisionUtils";
import {StageManager} from "../Stage/StageManager";

export default class BulletManager {

  constructor(parent, imgs) {
    BulletManager.expTypes = {fireBall: 'fireExp', iceBall: 'iceExp'};
    this.parent = parent;
    this.playerBulletList = [];
    this.enemyBulletList = [];
    this.iceBallList = [];
    this.fireBallList = [];
    this.canvasWidth = parent.gameWidth;
    this.canvasHeight = parent.gameHeight;

    this.imageList = {
      fireBall: imgs[0],
      iceBall: imgs[1],
      playerBullet: imgs[2],
      enemyBullet: makeBulletImage(3, ["#f01616", "#f8f860"])
    };
  }

  createBullet(x, y, s, v, type, pattern) {
    const listType = {
      playerBullet: this.playerBulletList,
      enemyBullet: this.enemyBulletList,
      iceBall: this.iceBallList,
      fireBall: this.fireBallList,
      multiBall1: this.enemyBulletList,
      multiBall2: this.enemyBulletList,
    };

    let list = listType[type];
    let bullet = list.find(x => !x.active);
    let isPlayer = type.startsWith("player");

    if (bullet === undefined) {
      switch (type) {
        case "iceBall":
        case "fireBall": {
          let bulletImage = this.imageList[type];
          bullet = new VLookAttacks(this, bulletImage, 2, bulletImage.width, bulletImage.width);
          break;
        }
        default: {
          let bulletImage = isPlayer ? this.imageList.playerBullet : this.imageList.enemyBullet;
          bullet = new Bullet(this, bulletImage);
          break;
        }
      }
      list.push(bullet);
    }
    bullet.type = type;
    bullet.setActive(x - bullet.w / 2, y - bullet.h / 2, s, v, isPlayer, pattern);
  }

  update(delta) {
    //유저 불렛 업데이트
    let allBullets = [
      ...this.playerBulletList.filter(b => b.active),
      ...this.enemyBulletList.filter(b => b.active),
      ...this.iceBallList.filter(i => i.active),
      ...this.fireBallList.filter(f => f.active)
    ];

    allBullets.forEach(b => {
      let p2 = {
        x: b.x, y: b.y, w: b.w, h: b.h, // destination image position
        frame: [0, 0, b.w, b.h],
        image: b.img
      };
      if (b.isPlayer) {
        //플레이어 총알이 적과 충돌했는지를 검사
        this.parent.enemyManager.enemyList.filter(e => e.active).forEach(e => {
          let p1 = {
            x: e.x, y: e.y, w: e.w, h: e.h, // destination image position
            frame: [0, 0, e.w, e.h], // source image position
            image: e.img// image element
          };

          let point = getCollisionPoint(p1, p2);
          if (point != null) {
            e.setDamage(b.damage);
            b.active = false;
            this.parent.createExplosion(point.x, point.y, 1, BulletManager.expTypes[b.type] || 'hitExp');
          }
        });
      }
      else {
        const {player} = this.parent;
        player.shields.filter(v => v.active).forEach(shield => {
          let sp1 = {
            x: shield.x, y: shield.y, w: shield.w, h: shield.h, // destination image position
            frame: [0, 0, shield.img.width, shield.img.height], // source image position
            image: shield.img // image element
          };
          let point = getCollisionPoint(sp1, p2, true);
          if (point != null) {
            b.active = false;
            this.parent.createExplosion(point.x, point.y, 3, BulletManager.expTypes[b.type] || 'hitExp');
          }
        });
        //일반 적총알이 플레이어에 충돌했는지를 검사
        if (b.active) { // 쉴드가 제거한 경우는 p2가 NULL임.
          let p1 = {
            x: player.x, y: player.y, w: player.w, h: player.h, // destination image position
            frame: [0, 0, player.img.width, player.img.height], // source image position
            image: player.img // image element
          };
          let point = getCollisionPoint(p1, p2, true);
          if (point != null) {
            this.parent.player.setDamage(b.damage);
            b.active = false;
            this.parent.createExplosion(point.x, point.y, 3, BulletManager.expTypes[b.type] || 'hitExp');
            if (this.parent.player.isPlayerDied) {
              setTimeout(() => {
                this.gameOver = true;
              }, 500);
            }
          }
        }
      }
    });

    this.playerBulletList.forEach(b => b.update(delta));
    this.enemyBulletList.forEach(b => b.update(delta));
    this.fireBallList.forEach(f => f.update(delta));
    this.iceBallList.forEach(i => i.update(delta));
  }

  clear() {
    this.playerBulletList.forEach(e => e.active = false);
    this.enemyBulletList.forEach(e => e.active = false);
    this.fireBallList.forEach(e => e.active = false);
    this.iceBallList.forEach(e => e.active = false);
  }

  render() {
    this.playerBulletList.forEach(b => b.render(this.parent.ctx));
    this.enemyBulletList.forEach(b => b.render(this.parent.ctx));
    this.fireBallList.forEach(f => f.render(this.parent.ctx));
    this.iceBallList.forEach(i => i.render(this.parent.ctx));
  }
}
