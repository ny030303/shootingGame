export class HLookAttacks {
    constructor(that, img, praim, duration, imgX, imgY) {
        this.app = that;
        this.x = null;
        this.y = null;
        this.w = null;
        this.h = null;
        this.img = img;
        this.now = 0;
        this.duration = duration;
        this.idx = 0;
        this.active = false;
        this.praim = praim;
        this.isLoop = false;
        this.imgX = imgX;
        this.imgY = imgY;
        this.vector = null;
        this.speed = null;
        this.damage = 2;
    }

    setActive(x, y, w, h, s, v, isLoop = false){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.active = true;
        this.now = 0;
        this.vector = v;
        this.speed = s;
        this.isLoop = isLoop;
    }

    update(d){
        if(!this.active) return;
        this.now += d;
        this.idx = Math.floor(this.praim * this.now / this.duration);
        // console.log(`now: ${this.now} , idx: ${this.idx}`);
        console.log(this.vector);
        let normal = this.vector.normalize();
        this.x += normal.x * d * this.speed;
        this.y += normal.y * d * this.speed;

        // 화면밖 검사
        if (this.x < -this.r || this.x > this.app.gameWidth + this.r || this.y < -this.r || this.y > this.app.gameHeight + this.r) {
            this.active = false;
        }

        if(this.now > this.duration) {
            // this.active = false;
            if(this.isLoop){
                this.now = 0;
            } else {
                this.active = false;
            }
        }
    }

    render(ctx){
        if(!this.active) return;
        let sx =  this.idx % this.praim * this.imgX;
        let sy = Math.floor(this.idx / this.praim) * this.imgY;

        ctx.drawImage(
            this.img, sx, sy, this.imgX, this.imgY,
            this.x, this.y, this.w, this.h);
    }

}