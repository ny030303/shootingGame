import {Enemy} from "./Enemy";
import {StageManager} from "../Stage/StageManager"
import {getCollisionPoint} from "../CollisionUtils";

export default class EnemyManager {

  constructor(parent, imgs) {
    this.parent = parent;
    this.canvasWidth = parent.gameWidth;
    this.canvasHeight = parent.gameHeight;

    this.enemyList = [];

    this.imageList = {
      enemy: imgs[0],
      enemy_2: imgs[1],
      enemy_2_1: imgs[2],
      boss_1: imgs[3],
      boss: imgs[4],
      enemy_3: imgs[5],
      enemy_4: imgs[6],
      boss_2: imgs[7],
      boss_3: imgs[8]
    }
  }

  getEnemyCount = () => this.enemyList.filter(v => v.active).length;

  createEnemy(data) {
    let type = data.type;
    let e = this.enemyList.filter(v => v.type === type).find(x => !x.active);
    if (e === undefined) {
      e = new Enemy(this.parent);
      this.enemyList.push(e);
    }
    e.reset(data.x, data.y, data.w, data.h, data.img, data);
  };

  update(delta) {
    //스테이지 읽고 에네미 생성 업데이트
    let nowEnemy = this.parent.stageData[StageManager.getStageIdx()];

    if (nowEnemy !== undefined && nowEnemy.type === "enemy" && nowEnemy.time <= this.parent.gameTimer) {
      this.createEnemy(nowEnemy.data);
      StageManager.addStageIdx();
    }

    this.enemyList.filter(v => v.active).forEach(e => {
      let p2 = {
        x: e.x, y: e.y, w: e.w, h: e.h, // destination image position
        frame: [0, 0, e.w, e.h],
        image: e.img
      };

      const {player} = this.parent;
      if( !e.data.type.startsWith("boss")) {
        player.shields.filter(v => v.active).forEach(shield => {
          let sp1 = {
            x: shield.x, y: shield.y, w: shield.w, h: shield.h, // destination image position
            frame: [0, 0, shield.img.width, shield.img.height], // source image position
            image: shield.img // image element
          };
          let point = null;
          if(p2 !== null) {
            point = getCollisionPoint(sp1, p2, true);
          }
          if( point != null) {
            p2 = null;
            e.active = false;
            if(e.data.nextStage) {
              e.hp -= 100;
            }
            this.parent.createExplosion(point.x, point.y, 1);
            this.parent.nowScore += e.score;


            if (e.data.type === "normal_2" || e.data.type === "normal_2_1") {
              this.parent.createItem(e.x + (e.w / 2), e.y + (e.h / 2), 30, 30, "item_1");
            } else if(e.data.type === "normal_4") {
              console.log(e.data.type);
              this.parent.createItem(e.x + (e.w / 2), e.y + (e.h / 2), 30, 30, "item_2");
            }
          }
        });
      }

      if( e.active ) {
        let p1 = {
          x: player.x, y: player.y, w: player.w, h: player.h, // destination image position
          frame: [0, 0, player.img.width, player.img.height], // source image position
          image: player.img // image element
        };

        let point = getCollisionPoint(p1, p2, true);
        if (point !== null) {
          console.log("collision:", point, p1, p2);
          this.parent.player.setDamage(100);
          this.parent.player.downgrade();
          e.active = false;
          this.parent.createExplosion(point.x, point.y, 1, 'hitExp');
          if (this.parent.player.isPlayerDied) {
            setTimeout(() => {
              this.parent.stageClear();
              this.parent.gameOver = true;
            }, 500);
          }
        }
      }
    });

    this.enemyList.forEach(e => e.update(delta));
  }

  clear() {
    this.enemyList.forEach(e => e.active = false);
  }

  render() {
    this.enemyList.forEach(e => e.render(this.parent.ctx));
  }
}
