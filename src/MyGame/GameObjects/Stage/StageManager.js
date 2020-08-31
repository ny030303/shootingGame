import {Stage} from "./Stage";
import {TimeBullet} from "../Bullet/TimeBullet";

export class StageManager {
    constructor(parent, imgs) {
        this.parent = parent;
        this.gw = this.parent.gameWidth;
        this.gh = this.parent.gameHeight;

        this.stageIdx = 0; //지금 stage에서 몇번째 적을 만들어내는지 저장
        this.nowStageNum = 1;
        this.stageTurnNum = 1;

        StageManager.gotoNextStage = this.nextStage.bind(this);
        StageManager.getStageIdx = () => this.stageIdx;
        StageManager.addStageIdx = () => this.stageIdx++;
        StageManager.getNowStageNum = () => this.nowStageNum;
        StageManager.getStageTurnNum = () => this.stageTurnNum;

        this.stageList = {
            stage: new Stage(this, imgs, this.stageTurnNum),
        };
    }

    reset() {
        this.stageIdx = 0; //지금 stage에서 몇번째 적을 만들어내는지 저장
        this.nowStageNum = 1;
    }

    nextStage() {
        if( this.parent.getCleanStatus() === 0 ) {
            this.parent.stageClear();
            this.stageIdx = 0;
            this.parent.gameTimer = 0;

            switch (this.nowStageNum) {
                case 1:
                    this.parent.stageScoreList.stage1 = this.parent.nowScore;
                    this.parent.stageData = this.stageList.stage.stage2;
                    break;
                case 2:
                    this.parent.stageScoreList.stage2 = this.parent.nowScore - this.parent.stageScoreList.stage1;
                    this.parent.stageData = this.stageList.stage.stage3;
                    break;
                case 3:
                    this.parent.stageScoreList.stage3 = this.parent.nowScore - this.parent.stageScoreList.stage2;
                    this.parent.stageData = this.stageList.stage.stage1;
                    break;
            }
            if(this.nowStageNum >= 3) {
                console.log("stageNum 들어옴", this.nowStageNum);
                this.reset();
                this.stageTurnNum++;
            } else {
                this.nowStageNum++;
            }

        }
        else {
            setTimeout(this.nextStage.bind(this), 1000);
        }
    }
}