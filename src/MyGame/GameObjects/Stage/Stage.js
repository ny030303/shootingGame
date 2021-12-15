import {StageManager} from "./StageManager";
import stage1 from "../Data/stage/stage1";

export class Stage {

    constructor(parent, imgs, stageTurnNum) {
        this.parent = parent;
        let gw = this.parent.gw;
        let gh = this.parent.gh;
        this.stageTurnNum = stageTurnNum;

        this.stageIdx = 0;

        console.log(StageManager.getStageTurnNum());


        this.stage1 = stage1;


        

        // this.stage2 = [
        //     {
        //         time: 0, type: "extra",
        //         data: Object.assign({}, extras.stageTitle, {x: gw / 3 - 1, img: imgs.stageTitle2}),
        //     },
        //     {
        //         time: 6,
        //         type: "enemy",
        //         data: Object.assign(enemys.normal1R, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2}),
        //     },

        //     {
        //         time: 13,
        //         type: "enemy",
        //         data: Object.assign(enemys.normal1R, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2}),
        //     },

        //     {
        //         time: 13,
        //         type: "enemy",
        //         data: Object.assign(enemys.normal1R, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2}),
        //     },

        //     ...makePatternEnemy(enemys.normal1L, 13, imgs.enemy_3, 8, 0.6, 2, false, 100),
        //     ...makeEitherSideEnemyNormal2(13, imgs.enemy, 20, 0.9, 250, gw),

        //     ...makePatternEnemy(enemys.normal4, 28, imgs.enemy_4, 10, 0.6, 1, true, 100),

        //     ...makeEitherSideEnemyNormal2(30, imgs.enemy, 5, 0.9, 250, gw),
        //     ...makePatternEnemy(enemys.normal4, 38, imgs.enemy_4, 3, 0.6, 1, false, 100),

        //     {
        //         time: 60, type: "enemy",
        //         data: Object.assign(enemys.boss1, {
        //             w: imgs.boss_1.width,
        //             h: imgs.boss_1.height,
        //             img: imgs.boss_1,
        //             nextStage: true
        //         })
        //     }
        //     // {
        //     //   time: 5, type: "enemy",
        //     //   data: Object.assign(enemys.boss1, {w: imgs.boss_1.width, h: imgs.boss_1.height, img: imgs.boss_1})
        //     // },
        // ];

        // this.stage2 = this.stage2.sort((a, b) => a.time < b.time ? -1 : 1);


        // this.stage2.forEach(v => {
        //     if (this.stageTurnNum >= 2) {
        //         v.data.s += (this.stageTurnNum * 10);
        //         v.data.hp += (this.stageTurnNum * 300);
        //     }
        // });

        // for (let i = 10; i < 50; i += 3) {
        //     let patternNum = Math.floor(Math.random() * 99) % 2;
        //     this.stage2.push({
        //         time: i,
        //         type: "enemy",
        //         data: Object.assign(enemys.normal1L, {
        //             x: gw / 3 - 1,
        //             img: imgs.enemy,
        //             pattern: patternNum,
        //             reverse: true
        //         }),
        //     });
        //     this.stage2.push({
        //         time: i,
        //         type: "enemy",
        //         data: Object.assign(enemys.normal4, {x: gw / 3 - 1, img: imgs.enemy, pattern: patternNum}),
        //     })
        // }

        // this.stage3 = [
        //     {
        //         time: 0, type: "extra",
        //         data: Object.assign({}, extras.stageTitle, {x: gw / 3 - 1, img: imgs.stageTitle3}),
        //     },

        //     {
        //         time: 13,
        //         type: "enemy",
        //         data: Object.assign(enemys.normal4, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2, type: "normal_4"}),
        //     },

        //     {
        //         time: 13,
        //         type: "enemy",
        //         data: Object.assign(enemys.normal4, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2, type: "normal_4"}),
        //     },

        //     ...makePatternEnemy(enemys.normal1L, 13, imgs.enemy_3, 8, 0.6, 2, false, 100),
        //     ...makeEitherSideEnemyNormal2(13, imgs.enemy, 20, 0.9, 250, gw),

        //     ...makePatternEnemy(enemys.normal4, 28, imgs.enemy_4, 10, 0.6, 1, true, 100),

        //     ...makeEitherSideEnemyNormal2(30, imgs.enemy, 5, 0.9, 250, gw),
        //     ...makePatternEnemy(enemys.normal4, 38, imgs.enemy_4, 3, 0.6, 1, false, 100),
        //     {
        //         time: 60, type: "enemy",
        //         data: Object.assign(enemys.boss3, {
        //             w: imgs.boss_3.width,
        //             h: imgs.boss_3.height,
        //             img: imgs.boss_3,
        //             nextStage: true
        //         })
        //     }
        // ]

        // this.stage3.forEach(v => {
        //     if (this.stageTurnNum >= 2) {
        //         v.data.s += (this.stageTurnNum * 10);
        //         v.data.hp += (this.stageTurnNum * 300);
        //     }
        // });

        // for (let i = 10; i < 50; i += 3) {
        //     let patternNum = Math.floor(Math.random() * 99) % 2;
        //     this.stage3.push({
        //         time: i,
        //         type: "enemy",
        //         data: Object.assign(enemys.normal1L, {
        //             x: gw / 3 - 1,
        //             img: imgs.enemy,
        //             pattern: patternNum,
        //             reverse: true
        //         }),
        //     });
        //     this.stage3.push({
        //         time: i,
        //         type: "enemy",
        //         data: Object.assign(enemys.normal4, {x: gw / 3 - 1, img: imgs.enemy, pattern: patternNum}),
        //     })
        // }
    }

}