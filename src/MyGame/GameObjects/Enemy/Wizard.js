import { Enemy } from "./Enemy";
 

export class Wizard extends Enemy {

    constructor(...args) {
        super(...args);
    }

    explosion() {
        super.explosion();
        super.parent.createItem(this.x + (this.w / 2), this.y + (this.h / 2), 30, 30, "item_1");
    }

    fire() {
        if (!this.active) return;

        let player = this.parent.player;
        let centerX = this.x + this.w / 2;
         
        setTimeout(this.fire.bind(this), this.fireTerm);
    }

    checkTimeFire() {
        if (this.timeBullets.length > 0 && this.timeBullets[0].time <= this.playTm) {
            let player = this.parent.player;
            let centerX = this.x + this.w / 2;
            let tmData = this.timeBullets.shift();
        }
    }


    // render(ctx) {
    //     if (!this.active) return;
    //     ctx.save();
    //     ctx.translate(this.x + (this.w / 2), this.y + (this.h / 2));
    //     ctx.rotate(this.angle * Math.PI / 180);
    //     ctx.drawImage(this.img, -(this.w / 2), -(this.h / 2), this.w, this.h);
    //     ctx.restore();
    // }

}
