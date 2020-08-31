export class HLookExplosion {
    constructor(img, praim, duration, imgX, imgY) {
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
    }

    setActive(x, y, w, h, isLoop = false){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.active = true;
        this.now = 0;
        this.isLoop = isLoop
    }

    update(d){
        if(!this.active) return;
        this.now += d;
        this.idx = Math.floor(this.praim * this.now / this.duration);
        // console.log(`now: ${this.now} , idx: ${this.idx}`);
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
        let sx = this.idx % this.praim * this.imgX;
        let sy = Math.floor(this.idx / this.praim) * this.imgY;

        ctx.drawImage(
            this.img, sx, sy, this.imgX, this.imgY,
            this.x, this.y, this.w, this.h);
    }

}