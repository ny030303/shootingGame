import extra from "../extra";
import wizards from "../enemy/wizard";
import bosses from "../enemy/boss";
import enemy from "../enemy/enemy";
import gameSetting from "../game";
import { makeEitherSideEnemys, makePatternEnemy } from "./util";
import { Enemy } from "../../Enemy/Enemy";
import { Wizard } from "../../Enemy/Wizard";
import { Vector } from "../../Vector";
let gw = gameSetting.width;
// let titleImages = GameMain.app.titleImages;

let stage = [
    {
        time: 0, type: "extra",
        data: Object.assign({}, extra[0], {x: gw / 3 - 1}),
    },

    // 양쪽 사이드에 5 enemy vector ㄴㅐ려오기
    ...makeEitherSideEnemys(Enemy, enemy, 4, 5, 0.9, 250, gw),
    // 7번 패턴 양쪽에     10
    ...makePatternEnemy(Wizard, wizards[0], 10, 5, 0.9, 7, false, 100),
    ...makePatternEnemy(Wizard, wizards[1], 10, 5, 0.9, 7, true, 100),

    // 18
    {
        time: 18,
        type: Enemy,
        data: Object.assign({}, enemy, {x: gw / 3 - 1, v: new Vector(enemy.v.x, enemy.v.y)}),
    },

    {
        time: 18,
        type: Enemy,
        data: Object.assign({}, enemy, {x: gw - (gw / 3 - 1), v: new Vector(enemy.v.x, enemy.v.y)}),
    },

    // ...makePatternEnemy(enemy, 33, 10, 0.6, 1, true, 100),
    // ...makeEitherSideEnemys(Enemy, enemy, 50, 3, 0.9, 250, gw),
    {
        time: 60, type: "enemy",
        data: Object.assign(bosses[0], { nextStage: true })
    }
]


// for (let i = 10; i < 50; i += 3) {
//     let patternNum = Math.floor(Math.random() * 99) % 2;
//     stage.push({
//         time: i,
//         type: "enemy",
//         data: Object.assign(enemy, {
//             x: gw / 3 - 1,
//             pattern: patternNum,
//             reverse: true
//         }),
//     });
//     stage.push({
//         time: i,
//         type: "enemy",
//         data: Object.assign(enemy, {x: gw / 3 - 1, pattern: patternNum}),
//     })
// }

stage = stage.sort((a, b) => a.time < b.time ? -1 : 1);

// stage.forEach(v => {
//     if (this.stageTurnNum >= 2) {
//         v.data.s += (this.stageTurnNum * 10);
//         v.data.hp += (this.stageTurnNum * 300);
//     }
// });
export default stage;