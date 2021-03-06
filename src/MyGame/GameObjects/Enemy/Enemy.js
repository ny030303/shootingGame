﻿import {Vector} from "../Vector";
import {Patterns} from "../Patterns";
import {StageManager} from "../Stage/StageManager";
import {isOverlapedRect} from "../CollisionUtils";
import {TimeBullet} from "../Bullet/TimeBullet";

const makeTargetDirVector = (b, p) => {
    return new Vector(p.x - (b.x + b.w / 2) + (p.w / 2), p.y - (b.y + b.h - 5) + (p.h / 2));
};

export class Enemy {

    constructor(parent) {
        this.parent = parent;
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.img = null;
        this.active = false;
        this.fireTerm = 1200;
        this.expSound = new Audio();
        this.expSound.src = "mp3/explodeEffect.mp3";
        this.stopBoss = false;
        this.playTm = null;
        this.timer = 0;
        this.timeBullets = [];
        this.angle = 0;
        this.score = 100;
    }

    reset(x, y, w, h, img, data) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;

        this.timeBullets = TimeBullet.getEnemy(data.type);
        this.active = true;
        this.playTm = null;
        this.data = Object.assign({}, data);
        this.fire();
    }

    fire() {
        if (!this.active) return;

        let player = this.parent.player;
        let centerX = this.x + this.w / 2;
        switch (this.data.type) {
            case "normal_1":
                this.parent.createBullet(centerX, this.y + this.h - 5, 300, makeTargetDirVector(this, player), "enemyBullet");
                break;
            case "normal_1_1":

                break;
            case "normal_2":
                this.parent.createBullet(centerX, this.y + this.h - 10, 300, new Vector(0, 1), "fireBall");
                break;
            case "normal_2_1":
                this.parent.createBullet(centerX, this.y + this.h - 10, 300, new Vector(0, 1), "iceBall");
                break;
            case "normal_4" :
            case "boss_3":
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(0, 1), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(0, -1), "enemyBullet");
                // this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 300, new Vector(0, 1), "enemyBullet");
                // this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 300, new Vector(0, -1), "enemyBullet");

                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(1, 4), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(-1, 4), "enemyBullet");

                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(4, 1), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(-4, 1), "enemyBullet");

                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(1, 2), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(-1, 2), "enemyBullet");

                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(2, 1), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(-2, 1), "enemyBullet");
                //
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(1, 1), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(-1, 1), "enemyBullet");
                //
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(1, 0), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(-1, 0), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(0, 1), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(0, 1), "enemyBullet");

                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(1, -2), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(-1, -2), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(2, -1), "enemyBullet");
                this.parent.createBullet(this.x + this.w / 3, this.y + this.h - 5, 200, new Vector(-2, -1), "enemyBullet");
                break;
            case "boss_2":

                break;
        }
        setTimeout(this.fire.bind(this), this.fireTerm);
    }

    checkTimeFire() {
        if (this.timeBullets.length > 0 && this.timeBullets[0].time <= this.playTm) {
            let player = this.parent.player;
            let centerX = this.x + this.w / 2;
            let tmData = this.timeBullets.shift();
            switch (tmData.type) {
                case "fireBall":
                case "iceBall":
                    this.parent.createBullet(centerX, this.y + this.h - 5, tmData.s, tmData.v, tmData.type, tmData.pattern);
                    break;
                case "multiBall1":
                    for (let i = 0; i < tmData.len; i++) {
                        let mvec = new Vector(tmData.v.x + (i / 10) * (i % 2 == 0 ? -1 : 1), tmData.v.y);
                        this.parent.createBullet(centerX, this.y + this.h - 5, tmData.s || 150, mvec, "enemyBullet");
                    }
                    break;
                case "multiBall2":
                    for (let i = 0; i < tmData.len; i++) {
                        let mvec = new Vector(tmData.v.x + (i / 10) * (i % 2 == 0 ? -1 : 1), tmData.v.y + (i / 10) * (i % 2 == 0 ? -1 : 1));
                        this.parent.createBullet(centerX, this.y + this.h - 5, tmData.s || 150, mvec, "enemyBullet");
                    }

                    for (let i = 0; i < tmData.len; i++) {
                        let mvec = new Vector(tmData.v.x + (i / 15) * (i % 2 == 0 ? 1 : -1), tmData.v.y + (i / 10) * (i % 2 == 0 ? -1 : 1));
                        this.parent.createBullet(centerX, this.y + this.h - 5, tmData.s || 150, mvec, "enemyBullet");
                    }

                    // for (let i = 0; i < tmData.len; i++) {
                    //   let mvec = new Vector(tmData.v.x + (i / 20) * (i % 2 == 0 ? 1 : -1), tmData.v.y + (i / 20) * (i % 2 == 0 ? -1 : 1));
                    //   this.parent.createBullet(centerX, this.y + this.h - 5, tmData.s || 150, mvec, "enemyBullet");
                    // }
                    // for (let i = 0; i < tmData.len; i++) {
                    //   let mvec = new Vector(tmData.v.x + (i / 10) * (i % 2 == 0 ? -1 : 1), tmData.v.y);
                    //   this.parent.createBullet(centerX, this.y + this.h - 5, tmData.s || 150, mvec, "enemyBullet");
                    // }
                    break;
            }
        }
    }

    setDamage(value) {
        this.data.hp -= value;
        if (this.data.hp <= 0) {
            this.explosion();
            this.parent.nowScore += this.score;
            if (this.data.nextStage) {
                console.log(this.data.nextStage);
                setTimeout(StageManager.gotoNextStage, 1000);
            }
        }
    }

    explosion() {
        //폭발이펙트 생성
        this.active = false;
        let scale = this.data.type.startsWith("normal_2") ? 2.5 : 1;
        if (this.data.type.startsWith("boss")) {
            scale = 4;
        }
        this.parent.createExplosion(this.x + this.w / 2, this.y + this.h / 2, scale);

        if (this.data.type === "normal_2" || this.data.type === "normal_2_1") {
            this.parent.createItem(this.x + (this.w / 2), this.y + (this.h / 2), 30, 30, "item_1");
        } else if (this.data.type === "normal_4") {
            console.log(this.data.type);
            this.parent.createItem(this.x + (this.w / 2), this.y + (this.h / 2), 30, 30, "item_2");
        }
    }

    update(d) {
        if (!this.active) return;
        if (this.startTm == null) this.startTm = 0;

        // vector 사용 X, 패턴으로 변경
        let pt = null;
        if (this.data.pattern) {
            pt = this.data.reverse ? Patterns.list[this.data.pattern].getReversePoint(this.playTm) : Patterns.list[this.data.pattern].getPoint(this.playTm);
            // if (this.data.type === "boss_1") {
            // }
        }
        this.checkTimeFire();

        if (pt == null) { // 직선 이동
            if (this.data.loop) {
                this.playTm = 0;
                this.timeBullets = TimeBullet.getEnemy(this.data.type);
            } else {
                let normal = null;
                if (Array.isArray(this.data.v)) {
                    normal = this.data.v[this.playTm < this.data.changeVTm ? 0 : 1].normalize();
                    // console.log(this.playTm);
                } else {
                    normal = this.data.v.normalize();
                }
                let ptCurrent = {x: this.x, y: this.y};

                this.x += normal.x * d * this.data.s;
                this.y += normal.y * d * this.data.s;

                let ptNextMove = {x: this.x, y: this.y};
                this.angle = Math.atan2(ptCurrent.x - ptNextMove.x, ptNextMove.y - ptCurrent.y) * 180 / Math.PI;
            }
            this.playTm += 0.01;
        } else { // 베지어 곡선 이동
            this.x = pt.x - (this.w / 2);
            this.y = pt.y;
            this.angle = pt.angle;
            this.playTm += (this.data.s / 10000) + 0.01;

        }
        // console.log(this.playTm);

        // 화면밖 검사
        if (!isOverlapedRect({x: 0, y: 0, w: this.parent.gameWidth, h: this.parent.gameHeight}, this)) {
            this.active = false;
        }
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
        if (!this.active) return;

        // ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

        if (this.data.type === "boss_1" || this.data.type === "boss_2" || this.data.type === "boss_3") {
            this.barGraphRender(ctx, 10, 50, 480, 10, this.data.hp, 3000, "red");
        }
        ctx.save();
        ctx.translate(this.x + (this.w / 2), this.y + (this.h / 2));
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.img, -(this.w / 2), -(this.h / 2), this.w, this.h);
        ctx.restore();
    }

}
