import {Vector} from "../Vector";

export class Item {
    constructor(img, that) {
        this.app = that;
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.img = img;
        this.active = true;
        this.type = null;
        this.now = null;
        this.angle = 0;
        this.vector = new Vector(0,1);
        this.speed = 2;// 앵글에 더할 값
        this.audio = new Audio();
        this.audio.src = "mp3/notice_1.mp3";
    }

    setActive(x,y,w,h, type) {
    	this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.type = type;
        this.active = true;
        this.now = 0;
    }

    soundPlay() {
        if (this.audio.paused === false) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        this.audio.play();
    }

    drawImageRotate(ctx, image, x, y, degrees, scale) {
        let w = image.width * scale;
        let h = image.height * scale;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(degrees * Math.PI/180);
        ctx.drawImage(image, -(w/2), -(h/2), w, h);
        ctx.restore();
    }

    update(d) {
        if(!this.active) return;
        this.angle = this.angle + this.speed;
        if(this.angle >= 360) this.angle = this.angle - 360;

        let normal = this.vector.normalize();
        this.x += normal.x * d * 30;
        this.y += normal.y * d * 30;
    }

    render(ctx){
        if(!this.active) return;
        // let sx = this.idx % 5 * 64;
        // let sy = Math.floor(this.idx / 5) * 64;

        this.drawImageRotate(ctx, this.img, this.x, this.y, this.angle, 1);
    }
}