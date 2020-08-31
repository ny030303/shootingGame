export class Helper {
    constructor(that) {
        this.app = that;
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.img = null;
        this.speed = 150;
        this.fireTerm = 0.2;
        this.active = true;
    }

    setActive(x, y, r, s, v, isEnemy = true) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = s;
        this.vector = v;
        this.active = true;
    }

    render(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }

}