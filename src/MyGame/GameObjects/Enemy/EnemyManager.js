import {Enemy} from "./Enemy";
import {StageManager} from "../Stage/StageManager"
import {checkCollision, getCollisionPoint} from "../CollisionUtils";
import { loadImage, loadJSON } from "../GameUtils";
import defaultData from "../Data/enemy/enemy";
import bossData from "../Data/enemy/boss";
import wizardData from "../Data/enemy/wizard";


export default class EnemyManager {

  constructor(parent) {
    this.parent = parent;
    this.canvasWidth = parent.gameWidth;
    this.canvasHeight = parent.gameHeight;

    this.enemyList = [];

    console.log(defaultData);
    this.imageList= {};
  }

  async init() {
    this.imageList = {
      "default" : await loadImage(defaultData.img),
      "wizard_fire": await loadImage(wizardData[0].img),
      "wizard_ice": await loadImage(wizardData[1].img),

      "boss_1": await loadImage(bossData[0].img),
      "boss_2": await loadImage(bossData[1].img),
      "boss_3": await loadImage(bossData[2].img),
    };
  }

  getEnemyCount = () => this.enemyList.filter(v => v.active).length;

  findNotActive = (type, list) => {
   return list.filter(v => v.type === type).find(x => !x.active);
  };
  
  createEnemy(data, model) {
    let e = this.findNotActive(data.type, this.enemyList);
    if (e === undefined) {
      e = new model(this.parent);
      this.enemyList.push(e);
    }
    e.reset(data);
  };

  readStage() {
    //스테이지 읽고 에네미 생성 업데이트
    let nowEnemy = this.parent.stageData[StageManager.getStageIdx()];
    // console.log(nowEnemy, this.parent.gameTimer);
    if (nowEnemy !== undefined && nowEnemy.time <= this.parent.gameTimer) {
      // 이미지 (이름.확장자) String => Img
      let key = Object.keys(this.imageList).find(v => v == nowEnemy.data.type);
      nowEnemy.data.img = this.imageList[key];

      this.createEnemy(nowEnemy.data, nowEnemy.type);
      StageManager.addStageIdx();
    }
  }

  checkIsHit(you, target) {
    // 부딪힘 체크
    let point = getCollisionPoint(you, target, true);
    console.log(checkCollision(you, target));
    if (point !== null) {
      this.parent.player.setDamage(100);
      this.parent.player.downgrade();
      // youObj.active = false;
      this.parent.createExplosion(point.x, point.y, 1, 'hitExp');
      if (this.parent.player.isPlayerDied) {
        setTimeout(() => {
          this.parent.stageClear();
          this.parent.gameOver = true;
        }, 500);
      }
      return true;
    } 
    return false;
  }

  makeIsHitJson(obj) {
    return {
      x: obj.x, y: obj.y, w: obj.w, h: obj.h, // destination image position
      frame: [0, 0, obj.img.width, obj.img.height],
      image: obj.img
    }
  }

  update(delta) {
    this.readStage();
    this.enemyList.filter(v => v.active).forEach(e => {
      if(this.checkIsHit(this.makeIsHitJson(e, "enemy"), this.makeIsHitJson(this.parent.player))) {
        e.active = false;
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
