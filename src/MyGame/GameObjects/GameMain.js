import {Player} from "./Player";
import {Stage} from "./Stage/Stage";
import {loadImage, loadJSON} from "./GameUtils";
import gameSetting from './Data/game';
import BulletManager from "./Bullet/BulletManager";
import ExplosionManager from "./Explosion/ExplosionManager";
import EnemyManager from "./Enemy/EnemyManager";
import {ItemManager} from "./Item/ItemManager";
import BackgroundManager from "./Background/BackgroundManager";
import {StageManager} from "./Stage/StageManager";
import {getUser} from "../../services/DataService";

class GameMain {
  constructor(canvas, ctx, gotoCalculatePage, isLogin) {
    GameMain.app = this; // 앱에 스태틱으로 넣었음
    this.canvas = canvas;
    this.ctx = ctx;
    this.gameWidth = gameSetting.width;
    this.gameHeight = gameSetting.height;
    this.gameOver = false;

    this.player = null;

    this.bgManager = null;
    this.bulletManager = null;
    this.explosionManager = null;
    this.enemyManager = null;
    this.itemManager = null;
    this.stageManager = null;


    this.animateTimer = null;
    this.gameTimer = 0; //게임이 시작되고 몇초가 흘렀는지 저장

    this.imageList = {}; //이미지 저장 오브젝트

    this.nowScore = 0;
    this.stageScoreList = {
      stage1: 0,
      stage2: 0,
      stage3: 0,
    };

    this.gotoCalculatePage = gotoCalculatePage;
    this.isLogin = isLogin;
    this.nowTime = 0;

  }

  // bypass functions
  createBullet = (x, y, s, v, type, stageData) => this.bulletManager.createBullet(x, y, s, v, type, stageData);
  createEnemy = (data) => this.enemyManager.createEnemy(data);
  createExplosion = (x, y, scale, type) => this.explosionManager.createExplosion(x, y, scale, type);
  createItem = (x, y, w, h, type) => this.itemManager.createItem(x, y, w, h, type);

  // createExtra = (data) => this.bgManager.createExtra(data);


  async init() {
    console.log(this.isLogin);
    // if(!this.isLogin) return;
    this.enemyManager = new EnemyManager(this);
    await this.enemyManager.init();
    // 스테이지 생성
    // this.titleImages = {
    //   stageTitle1: await loadImage('stageTitle_1.png'),
    //   stageTitle2: await loadImage('stageTitle_2.png'),
    //   stageTitle3: await loadImage('stageTitle_3.png'),
    // };
    this.stageManager = new StageManager(this);
    //백그라운드 생성
    this.bgManager = new BackgroundManager(this);
    await this.bgManager.init();

    // 매니저 이미지 넘겨주기
    this.bulletManager = new BulletManager(this);
    await this.bulletManager.init();
    
    this.explosionManager = new ExplosionManager(this, [
      await loadImage("explosion.png"),
      await loadImage("effect/IceShatter_2_96x96.png"),
      await loadImage("effect/Explosion_96x96.png"),
      await loadImage("hit_exp.png"),
    ]);

    this.itemManager = new ItemManager(this, [
      await loadImage("item.png"),
      await loadImage("rocket.png"),
    ]);
    // 플레이어 생성
    this.player = new Player(this, [
      await loadImage("player1.png"),
      await loadImage("guadebeam.png"),
      await loadImage("shield.png"),
      await loadImage("rocket.png"),
    ]);
    
    this.timeCheck = setInterval(() => {
      this.nowTime += 1;
    }, 1000);
    this.startGame();
  }

  startGame = () => {
    this.stageClear();
    this.nowScore = 0;
    this.stageData = this.stageManager.stageList.stage.stage1;
    this.player.reset();
    this.stageManager.reset();
    this.animateTimer = requestAnimationFrame(this.frame.bind(this));
  };

  stopGame = (bRankPage = true) => {
    this.gameOver = true;
    if( this.animateTimer ) {
      cancelAnimationFrame(this.animateTimer);
      this.animateTimer = null;
    }
    if( bRankPage === true) {
      this.gotoCalculatePage(this.nowScore);
    } else {

    }
  };

  stageClear () {
    this.bgManager.clear();
    this.bulletManager.clear();
    this.explosionManager.clear();
    this.enemyManager .clear();
    this.itemManager.clear();
  }

  getCleanStatus = () => this.enemyManager.getEnemyCount() + this.explosionManager.getExplosionCount();

  frame = (time) => {
    if (!this.start) this.start = time;
    let delta = time - this.start;
    this.start = time;
    // console.log(delta);

    if (this.gameOver === false) {
      this.update(delta / 1000);
      this.canvasRender();
      requestAnimationFrame(this.frame.bind(this));
    }
    else {
      this.stopGame();
    }
  };

  timeAdd = () => {

  };

  update = (delta) => {
    this.gameTimer += delta; //이렇게 되면 게임 진행시간이 this.gameTimer에 들어간다.

    this.bgManager.update(delta); //배경 업데이트
    this.bulletManager.update(delta);
    this.explosionManager.update(delta);
    this.enemyManager.update(delta);
    this.itemManager.update(delta);

    //유저 업데이트
    if (!this.player.isPlayerDied) this.player.update(delta);
    this.player.checkOut(this.gameWidth, this.gameHeight);

  };

  canvasRender = () => {
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.bgManager.render();
    this.bulletManager.render();

    // 객체 각각 render 해주기
    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = "#111";
    this.ctx.fillText(`SCORE: ${this.nowScore.toLocaleString()}`, 180, 27);

    this.ctx.font = '20px Arial';
    this.ctx.fillStyle = "#111";
    this.ctx.fillText(`TIME: ${this.nowTime}`, 380, 27);

    this.player.render(this.ctx);
    this.enemyManager.render(this.ctx);
    this.itemManager.render(this.ctx);

    this.explosionManager.render();
  };
}

export default GameMain;
