import Background from "./Background";
import Extra from "./Extra";
import extraData from "../Data/extra";
import bgData from "../Data/background/background";
import {StageManager} from "../Stage/StageManager";
import { loadImage } from "../GameUtils";

export default class BackgroundManager {

  constructor(parent) {
    this.parent = parent;
    this.backList = [];
    this.extraList = [];
    this.bgImgList = [];
    this.bgNums  = 0;

  }

  async init() {
    this.bgImgList = [
      await loadImage(bgData[0].img),
      await loadImage(bgData[1].img),
      await loadImage(bgData[2].img)
    ];

    this.titleImgList = {
        stageTitle1: await loadImage(extraData[0].img),
        stageTitle2: await loadImage(extraData[1].img),
        stageTitle3: await loadImage(extraData[2].img),
    }

    this.splitLoadingImage(this.bgNums);
  }

  splitLoadingImage(idx) {
    if( idx >= this.bgImgList.length ) idx = this.bgImgList.length;
    this.backList = [];
    for (let i = 0; i < 3; i++) {
      let bgObject = new Background(0, -i * this.parent.gameHeight, this.parent.gameWidth, this.parent.gameHeight, this.bgImgList[idx]);
      this.backList.push(bgObject);
    }
    // console.log("splitLoadingImage() - ", idx)

    console.log(this.backList);
  }

  createExtra(data, model = Extra) {
    let type = data.type;
    let e = this.extraList.filter(v => v.type === type).find(x => !x.active);
    if (e === undefined) {
      
      e = new model(this.parent);
      this.extraList.push(e);
    }
    console.log(data);
    e.reset(data.x, data.y, data.w, data.h, data.img, data);
  }

  readStage() {
    //extra img draw
    let nowExtra = this.parent.stageData[StageManager.getStageIdx()];
    if (nowExtra !== undefined && nowExtra.type === "extra" && nowExtra.time <= this.parent.gameTimer) {
      let key = Object.keys(this.titleImgList).find(v => v == nowExtra.data.type);
      nowExtra.data.img = this.titleImgList[key]; 
      this.createExtra(nowExtra.data);
      StageManager.addStageIdx();
    }
  }

  update(delta) {
    // background Img scroll
    this.backList.forEach(back => back.update(delta));

    if (this.backList[0].y > this.parent.gameHeight) {
      let first = this.backList.shift();
      first.y = this.backList[this.backList.length - 1].y - this.parent.gameHeight;
      this.backList.push(first);
    }

    this.readStage();
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
