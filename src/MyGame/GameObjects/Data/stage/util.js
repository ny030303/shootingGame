// import enemy from "../enemy/enemy";

import { Vector } from "../../Vector";

// export const makeEnemy = (newAttriute) => Object.assign({}, enemy, newAttriute);

// export const enemys = {
//     normal1L: makeEnemy({hp: 100,}),
//     normal1R: makeEnemy({hp: 100, reverse: true}),
//     normal2: makeEnemy({hp: 1, pattern: undefined}),
//     // normal_2 == 파이어볼, normal_2_1== 아이스볼
//     normal3L: makeEnemy({w: 70, h: 100, s: 50, hp: 100, type: "normal_2", pattern: 2}),
//     normal3R: makeEnemy({w: 70, h: 100, s: 50, hp: 100, type: "normal_2", pattern: 2, reverse: true}),
//     // normal4: 노랑이 큰놈
//     normal4: makeEnemy({w: 70, h: 100, s: 50, hp: 100, type: "normal_4", pattern: 0}),
//     boss1: makeEnemy({s: 200, hp: 3000, type: "boss_1", pattern: 3, loop: true}),
//     boss2: makeEnemy({s: 10, hp: 3000, type: "boss_2", pattern: 6, loop: true}),
//     boss3: makeEnemy({s: 10, hp: 3000, type: "boss_3", pattern: 6, loop: true, reverse: true})
// };

export const makeEitherSideEnemys = (type, dataEnemy, time, cnt, gap, y, gw) => {
    let stageEnemys = [];
    for (let i = 0; i < cnt; i++) {
        let yPos = Math.random() * 130 + y;
        let enemy = {
            time: i * gap + time,
            type: type,
            data: Object.assign({}, dataEnemy, {
                x: 0, y: yPos, changeVTm: Math.random() + 0.7,
                v: [new Vector(1, 0), new Vector(0, 1)],
                angles: [90, 0]
            }),
        };
        stageEnemys.push(enemy);
        console.log(gw);
        let enemyR = {
            time: i * gap + time + 0.5, // 0.5는 시간차
            type: type,
            data: Object.assign({}, dataEnemy, {
                x: Number(gw), y: yPos, changeVTm: Math.random() + 0.7,
                v: [new Vector(-1, 0), new Vector(0, 1)],
                angles: [-90, 0]
            }),
        };
        stageEnemys.push(enemyR);
    }

    return stageEnemys;
};

export const makePatternEnemy = (type, dataEnemy, time, cnt, gap, patternNum, reverse, speed) => {
    let enemyArr = [];
    for (let i = 0; i < cnt; i++) {
        let enemy = {
            time: i * gap + time,
            type: type,
            data: Object.assign({}, dataEnemy, { pattern: patternNum, reverse: reverse, s: speed}),
        };
        enemyArr.push(enemy);
    }

    return enemyArr;
};