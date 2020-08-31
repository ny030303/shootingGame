import Background from "./Background";
import Extra from "./Extra";
import {StageManager} from "../Stage/StageManager"

export default class BackgroundManager {

  constructor(parent, bgImages) {
    this.parent = parent;
    this.backList = [];
    this.extraList = [];
    this.bgImages = bgImages;
    this.bgNums  = 0;

    this.splitLoadingImage(this.bgNums);
  }

  splitLoadingImage(idx) {
    if( idx >= this.bgImages.length ) idx = this.bgImages.length;
    this.backList = [];
    for (let i = 0; i < 3; i++) {
      let bgObject = new Background(0, -i * this.parent.gameHeight, this.parent.gameWidth, this.parent.gameHeight, this.bgImages[idx]);
      this.backList.push(bgObject);
    }
    console.log("splitLoadingImage() - ", idx)
  }

  createExtra(data) {
    let type = data.type;
    let e = this.extraList.filter(v => v.type === type).find(x => !x.active);
    if (e === undefined) {
      e = new Extra(this.parent);
      this.extraList.push(e);
    }
    e.reset(data.x, data.y, data.w, data.h, data.img, data);
  }

  update(delta) {
    // background Img scroll
    this.backList.forEach(back => back.update(delta));

    if (this.backList[0].y > this.parent.gameHeight) {
      let first = this.backList.shift();
      first.y = this.backList[this.backList.length - 1].y - this.parent.gameHeight;
      this.backList.push(first);
    }

    //extra img draw
    let nowExtra = this.parent.stageData[StageManager.getStageIdx()];
    if (nowExtra !== undefined && nowExtra.type === "extra" && nowExtra.time <= this.parent.gameTimer) {
      this.createExtra(nowExtra.data);
      StageManager.addStageIdx();
    }
    this.extraList.forEach(e => e.update(delta));
  }

  clear() {
    this.extraList.forEach(e => e.active = false);
    console.log(StageManager.getNowStageNum());
    setTimeout(() => {
      if( this.bgNums !== (StageManager.getNowStageNum()-1) )  {
        this.bgNums = StageManager.getNowStageNum()-1;
        this.splitLoadingImage(this.bgNums);
      }
    }, 2000);
  }

  render() {
    this.backList.forEach(back => back.render(this.parent.ctx));
    this.extraList.forEach(e => e.render(this.parent.ctx));
  }
}
