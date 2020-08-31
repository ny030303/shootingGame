import {Vector} from "./Vector";

export class Player {

  constructor(parent, imgs) {
    this.parent = parent;
    this.x = parent.gameWidth / 2 - 30;
    this.y = parent.gameHeight - 60;
    this.w = 60;
    this.h = 80;
    this.img = imgs[0];
    this.keyArr = {};
    this.speed = 200;
    this.fireTerm = 0.2;
    this.currentFireTerm = 0;
    this.init();
    this.hp = 1000;
    this.isPlayerDied = false;
    this.audio = new Audio();
    this.audio.src = "mp3/Pew__004.ogg";

    let shieldSound = new Audio();
    shieldSound.src = "mp3/shield_1.mp3";
    this.shields = [
      {
        active: false,
        x: (this.parent.gameWidth - imgs[1].width) / 2,
        y: this.parent.gameHeight,
        w: imgs[1].width,
        h: imgs[1].height,
        img: imgs[1],
        v: new Vector(0, 1),
        s: 450,
        type: "beam",
        gauge: 0,
        gaugeSpeed: 10,
        count: 1,
        rocketImg: imgs[3]
      },
      {
        active: false,
        x: this.x -20,
        y: this.y -15,
        w: 100,
        h: 100,
        img: imgs[2],
        time:10,
        type: "circle",
        sound: shieldSound,
        gauge: 0,
        gaugeSpeed: 15
      }
    ];

    this.bulletLevel = 1;
  }

  init() {
    document.addEventListener("keydown", e => {
      if (e.code === 'KeyX') { // 특수 무기
        console.log(this.shields[0]);
        if(this.shields[0].count > 0) {
          if( !this.shields[0].active ) {
            this.shields[0].y = 0 ;
            this.shields[0].active = true;
            this.shields[0].count--;
            // console.log(this.shields, this.parent);
          }
        }
      }
      else if(e.code === 'KeyC') {
        if(this.shields[1].gauge >= 100) {
          if (!this.shields[1].active) {
            this.shields[1].active = true;
            this.shields[1].gauge = 0;

            if (this.shields[1].sound.paused === false) {
              this.shields[1].sound.pause();
              this.shields[1].sound.currentTime = 0;
            }
            this.shields[1].sound.play();
          }
        }
      }
      else {
        this.keyArr[e.code] = true;
      }
    });

    document.addEventListener("keyup", e => {
      this.keyArr[e.code] = false;
      // if(e.code === "ArrowLeft")  this.keyArr[0]
      // if(e.code === "ArrowRight") this.keyArr[1] = false;
      // if(e.code === "ArrowUp")    this.keyArr[2] = false;
      // if(e.code === "ArrowDown")  this.keyArr[3] = false;
    })
  }

  reset() {
    this.x = this.parent.gameWidth / 2 - 30;
    this.y = this.parent.gameHeight - 60;
    this.w = 60;
    this.h = 80;
    this.hp = 1000;
    this.isPlayerDied = false;
  }

  setDamage(value) {
    // console.log(value);
    this.hp -= value;
    if (this.hp <= 0) {
      this.explosion();
    }
  }

  explosion() {
    //폭발이펙트 생성
    this.parent.createExplosion(this.x, this.y, 1);
    this.isPlayerDied = true;
    this.parent.gameOver = true;
  }

  fire() {
    if (this.currentFireTerm > 0) return;
    if (this.bulletLevel === 1) {
      this.parent.createBullet(this.x + this.w / 2, this.y, 550, new Vector(0, -1), "playerBullet");
    }
    else if (this.bulletLevel === 2) {
      this.parent.createBullet(this.x + this.w / 4, this.y, 550, new Vector(0, -1), "playerBullet");
      this.parent.createBullet(this.x + this.w / 4 * 3, this.y, 550, new Vector(-0, -1), "playerBullet");
    }
    else if (this.bulletLevel === 3) {
      this.parent.createBullet(this.x + this.w / 4, this.y, 550, new Vector(0, -1), "playerBullet");
      this.parent.createBullet(this.x + this.w / 4 * 3, this.y, 550, new Vector(-0, -1), "playerBullet");
      this.parent.createBullet(this.x + this.w / 4 * 2, this.y, 550, new Vector(-0, -1), "playerBullet");
    }
    else if (this.bulletLevel === 4) {
      this.parent.createBullet(this.x + this.w / 4, this.y, 550, new Vector(0, -1), "playerBullet");
      this.parent.createBullet(this.x + this.w / 4 * 3, this.y, 550, new Vector(-0, -1), "playerBullet");
      this.parent.createBullet(this.x + this.w / 4 * 2, this.y, 550, new Vector(-0, -1), "playerBullet");
      this.parent.createBullet(this.x + this.w / 4 * 3, this.y, 550, new Vector(1, -4), "playerBullet");
      this.parent.createBullet(this.x + this.w / 4, this.y, 550, new Vector(-1, -4), "playerBullet");
    }

    if (this.audio.paused === false) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    // console.log("paused: ", this.audio.paused, "played: ", this.audio.played,"readyState: ", this.audio.readyState);
    this.audio.play();
    this.currentFireTerm = this.fireTerm;
  }

  update(d) {
    if (this.currentFireTerm > 0) this.currentFireTerm -= d * 1.5;
    if(this.shields[1].gauge < 100) this.shields[1].gauge += d * this.shields[1].gaugeSpeed;

    this.shields.filter(v => v.active && v.type === "circle").forEach(shield => {
      shield.x = this.x -20;
      shield.y = this.y -15;
      if (this.shields[1].time > 0) this.shields[1].time -= d * 1;

      if(this.shields[1].time <= 0) {
        this.shields[1].active = false;
        this.shields[1].time = 10;
      }
    });

    this.shields.filter(v => v.active && v.type === "beam").forEach(shield => {
      let normal = shield.v.normalize();
      shield.x += normal.x * d * shield.s;
      shield.y += normal.y * d * shield.s;

      console.log(shield.y + shield.h);
      if( (shield.y + shield.h) > 800 + shield.h) {
        shield.active = false;
      }
    });

    let dx = 0, dy = 0;

    if (this.keyArr["ArrowLeft"]) dx = -1;
    if (this.keyArr["ArrowRight"]) dx = 1;
    if (this.keyArr["ArrowUp"]) dy = -1;
    if (this.keyArr["ArrowDown"]) dy = 1;
    if (this.keyArr["KeyZ"]) this.fire();

    this.x += dx * d * this.speed;
    this.y += dy * d * this.speed;
  }

  upgrade(itemType) {
    if (itemType === "item_1") {
      this.bulletLevel++;
    } else if(itemType === "item_2") {
      this.shields[0].count++;
    }
  }

  downgrade() {
    this.bulletLevel--;
    if(this.bulletLevel <= 0) {
      this.explosion();
    }
  }

  checkOut(w, h) {
    if (this.x < 0) this.x = 0;
    if (this.x + this.w >= w) this.x = w - this.w;
    if (this.y < 0) this.y = 0;
    if (this.y + this.h >= h) this.y = h - this.h;
  }

  barGraphRender(ctx, x, y, w, h, nowNum, maxNum, color) {
    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.fillRect(x, y, w, h);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, (w * nowNum / maxNum), h);
    ctx.closePath();
  }

  render(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#333";
    ctx.fillRect(10, 10, 160, 20);
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "#f8f860";
    ctx.fillRect(10, 10, (160 * this.hp / 1000), 20);
    ctx.closePath();

    ctx.drawImage(this.shields[0].rocketImg, 400, 780, 30, 20); // 폭탄
    this.barGraphRender(ctx, 10, 780, 100, 5, this.shields[1].gauge, 100, "blue");
    ctx.font = '18px Arial';
    ctx.fillStyle = "#111";
    ctx.fillText(`X ${this.shields[0].count}`, 450, 795);

    if( !this.isPlayerDied ) {
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

    this.shields.filter(v => v.active).forEach(shield => ctx.drawImage(shield.img, shield.x, shield.y, shield.w, shield.h));
  }

}
