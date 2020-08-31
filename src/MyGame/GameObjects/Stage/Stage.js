import {Vector} from "../Vector";
import {StageManager} from "./StageManager";

const vectors = [
    new Vector(0, 1)
];

const extras = {
    stageTitle: {x: 3 - 30, y: 0, w: 273, h: 97, img: null, s: 100, pattern: 4}
};

// const makeTargetDirVector = (b, p) => {
//   return {
//     x: p.x - (b.x + b.w / 2) + (p.w / 2),
//     y: p.y - (b.y + b.h - 5) + (p.h / 2)
//   };
// };


const defaultEnemy = {
    x: -40,
    y: -60,
    w: 40,
    h: 60,
    img: null,
    s: 100,
    v: vectors[0],
    hp: 2,
    type: "normal_1",
    pattern: 1
};

const makeEnemy = (newAttriute) => Object.assign({}, defaultEnemy, newAttriute);

const enemys = {
    normal1L: makeEnemy({hp: 100,}),
    normal1R: makeEnemy({hp: 100, reverse: true}),
    normal2: makeEnemy({hp: 1, pattern: undefined}),
    // normal_2 == 파이어볼, normal_2_1== 아이스볼
    normal3L: makeEnemy({w: 70, h: 100, s: 50, hp: 100, type: "normal_2", pattern: 2}),
    normal3R: makeEnemy({w: 70, h: 100, s: 50, hp: 100, type: "normal_2", pattern: 2, reverse: true}),
    // normal4: 노랑이 큰놈
    normal4: makeEnemy({w: 70, h: 100, s: 50, hp: 100, type: "normal_4", pattern: 0}),
    boss1: makeEnemy({s: 200, hp: 3000, type: "boss_1", pattern: 3, loop: true}),
    boss2: makeEnemy({s: 10, hp: 3000, type: "boss_2", pattern: 6, loop: true}),
    boss3: makeEnemy({s: 10, hp: 3000, type: "boss_3", pattern: 6, loop: true, reverse: true})
};

const makeEitherSideEnemyNormal2 = (time, img, cnt, gap, y, gw) => {
    let stageEnemys = [];
    for (let i = 0; i < cnt; i++) {
        let patternNum = Math.floor(Math.random() * 99) % 2;

        let yPos = Math.random() * 130 + y;
        let enemy = {
            time: i * gap + time,
            type: "enemy",
            data: Object.assign({}, enemys.normal2, {
                x: 0, y: yPos, img: img, changeVTm: Math.random() + 0.7,
                v: [new Vector(1, 0), new Vector(0, 1)],
                angles: [90, 0],
            }),
        };
        stageEnemys.push(enemy);

        let enemyR = {
            time: i * gap + time + 0.5, // 0.5는 시간차
            type: "enemy",
            data: Object.assign({}, enemys.normal2, {
                x: gw, y: yPos, img: img, changeVTm: Math.random() + 0.7,
                v: [new Vector(-1, 0), new Vector(0, 1), new Vector(-1, 0)],
                angles: [-90, 0],
            }),
        };
        stageEnemys.push(enemyR);
    }

    return stageEnemys;
};

const makePatternEnemy = (type, time, img, cnt, gap, patternNum, reverse, speed) => {
    let enemyArr = [];
    for (let i = 0; i < cnt; i++) {
        let enemy = {
            time: i * gap + time,
            type: "enemy",
            data: Object.assign({}, type, {img: img, pattern: patternNum, reverse: reverse, s: speed}),
        };
        enemyArr.push(enemy);
    }

    return enemyArr;
};

export class Stage {

    constructor(parent, imgs, stageTurnNum) {
        this.parent = parent;
        let gw = this.parent.gw;
        let gh = this.parent.gh;
        this.stageTurnNum = stageTurnNum;

        this.stageIdx = 0;

        console.log(StageManager.getStageTurnNum());


        this.stage1 = [
            {
                time: 0, type: "extra",
                data: Object.assign({}, extras.stageTitle, {x: gw / 3 - 1, img: imgs.stageTitle1}),
            },



          // 7번 패턴 양쪽에
            ...makePatternEnemy(enemys.normal1L, 4, imgs.enemy_3, 5, 0.9, 7, false, 100),
            ...makePatternEnemy(enemys.normal1L, 4, imgs.enemy_3, 5, 0.9, 7, true, 100),
          // 양쪽 사이드에 왕창 나오는 거
            ...makeEitherSideEnemyNormal2(11, imgs.enemy, 5, 0.9, 250, gw),

            // ...makePatternEnemy(enemys.normal4, 17, imgs.enemy_4, 2, 1, 8, false, 100),
            // ...makePatternEnemy(enemys.normal4, 17, imgs.enemy_4, 3, 0.6, 3, true, 100),

            {
                time: 18,
                type: "enemy",
                data: Object.assign(enemys.normal3L, {x: gw / 3 - 1, img: imgs.enemy_2, pattern: 8}),
            },

            {
                time: 18,
                type: "enemy",
                data: Object.assign(enemys.normal3R, {x: gw / 3 - 1, img: imgs.enemy_2_1, pattern: 8}),
            },

            ...makePatternEnemy(enemys.normal2, 33, imgs.enemy_2, 10, 0.6, 1, true, 100),
            ...makeEitherSideEnemyNormal2(50, imgs.enemy, 3, 0.9, 250, gw),

            {
                time: 60, type: "enemy",
                data: Object.assign(enemys.boss2, {
                    w: imgs.boss_2.width - 100,
                    h: imgs.boss_2.height - 100,
                    img: imgs.boss_2,
                    nextStage: true
                })
            }

        ];


        if (this.stageTurnNum >= 2) {
            this.stage1.push(makeEitherSideEnemyNormal2(12, imgs.enemy, 5, 0.9, 250, gw));
        }


        for (let i = 10; i < 50; i += 3) {
            let patternNum = Math.floor(Math.random() * 99) % 2;
            this.stage1.push({
                time: i,
                type: "enemy",
                data: Object.assign(enemys.normal1L, {
                    x: gw / 3 - 1,
                    img: imgs.enemy,
                    pattern: patternNum,
                    reverse: true
                }),
            });
            this.stage1.push({
                time: i,
                type: "enemy",
                data: Object.assign(enemys.normal2, {x: gw / 3 - 1, img: imgs.enemy, pattern: patternNum}),
            })
        }

        this.stage1 = this.stage1.sort((a, b) => a.time < b.time ? -1 : 1);

        this.stage1.forEach(v => {
            if (this.stageTurnNum >= 2) {
                v.data.s += (this.stageTurnNum * 10);
                v.data.hp += (this.stageTurnNum * 300);
            }
        });

        this.stage2 = [
            {
                time: 0, type: "extra",
                data: Object.assign({}, extras.stageTitle, {x: gw / 3 - 1, img: imgs.stageTitle2}),
            },
            {
                time: 6,
                type: "enemy",
                data: Object.assign(enemys.normal1R, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2}),
            },

            {
                time: 13,
                type: "enemy",
                data: Object.assign(enemys.normal1R, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2}),
            },

            {
                time: 13,
                type: "enemy",
                data: Object.assign(enemys.normal1R, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2}),
            },

            ...makePatternEnemy(enemys.normal1L, 13, imgs.enemy_3, 8, 0.6, 2, false, 100),
            ...makeEitherSideEnemyNormal2(13, imgs.enemy, 20, 0.9, 250, gw),

            ...makePatternEnemy(enemys.normal4, 28, imgs.enemy_4, 10, 0.6, 1, true, 100),

            ...makeEitherSideEnemyNormal2(30, imgs.enemy, 5, 0.9, 250, gw),
            ...makePatternEnemy(enemys.normal4, 38, imgs.enemy_4, 3, 0.6, 1, false, 100),

            {
                time: 60, type: "enemy",
                data: Object.assign(enemys.boss1, {
                    w: imgs.boss_1.width,
                    h: imgs.boss_1.height,
                    img: imgs.boss_1,
                    nextStage: true
                })
            }
            // {
            //   time: 5, type: "enemy",
            //   data: Object.assign(enemys.boss1, {w: imgs.boss_1.width, h: imgs.boss_1.height, img: imgs.boss_1})
            // },
        ];

        this.stage2 = this.stage2.sort((a, b) => a.time < b.time ? -1 : 1);


        this.stage2.forEach(v => {
            if (this.stageTurnNum >= 2) {
                v.data.s += (this.stageTurnNum * 10);
                v.data.hp += (this.stageTurnNum * 300);
            }
        });

        for (let i = 10; i < 50; i += 3) {
            let patternNum = Math.floor(Math.random() * 99) % 2;
            this.stage2.push({
                time: i,
                type: "enemy",
                data: Object.assign(enemys.normal1L, {
                    x: gw / 3 - 1,
                    img: imgs.enemy,
                    pattern: patternNum,
                    reverse: true
                }),
            });
            this.stage2.push({
                time: i,
                type: "enemy",
                data: Object.assign(enemys.normal4, {x: gw / 3 - 1, img: imgs.enemy, pattern: patternNum}),
            })
        }

        this.stage3 = [
            {
                time: 0, type: "extra",
                data: Object.assign({}, extras.stageTitle, {x: gw / 3 - 1, img: imgs.stageTitle3}),
            },

            {
                time: 13,
                type: "enemy",
                data: Object.assign(enemys.normal4, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2, type: "normal_4"}),
            },

            {
                time: 13,
                type: "enemy",
                data: Object.assign(enemys.normal4, {x: gw / 3 - 1, img: imgs.enemy, pattern: 2, type: "normal_4"}),
            },

            ...makePatternEnemy(enemys.normal1L, 13, imgs.enemy_3, 8, 0.6, 2, false, 100),
            ...makeEitherSideEnemyNormal2(13, imgs.enemy, 20, 0.9, 250, gw),

            ...makePatternEnemy(enemys.normal4, 28, imgs.enemy_4, 10, 0.6, 1, true, 100),

            ...makeEitherSideEnemyNormal2(30, imgs.enemy, 5, 0.9, 250, gw),
            ...makePatternEnemy(enemys.normal4, 38, imgs.enemy_4, 3, 0.6, 1, false, 100),
            {
                time: 60, type: "enemy",
                data: Object.assign(enemys.boss3, {
                    w: imgs.boss_3.width,
                    h: imgs.boss_3.height,
                    img: imgs.boss_3,
                    nextStage: true
                })
            }
        ]

        this.stage3.forEach(v => {
            if (this.stageTurnNum >= 2) {
                v.data.s += (this.stageTurnNum * 10);
                v.data.hp += (this.stageTurnNum * 300);
            }
        });

        for (let i = 10; i < 50; i += 3) {
            let patternNum = Math.floor(Math.random() * 99) % 2;
            this.stage3.push({
                time: i,
                type: "enemy",
                data: Object.assign(enemys.normal1L, {
                    x: gw / 3 - 1,
                    img: imgs.enemy,
                    pattern: patternNum,
                    reverse: true
                }),
            });
            this.stage3.push({
                time: i,
                type: "enemy",
                data: Object.assign(enemys.normal4, {x: gw / 3 - 1, img: imgs.enemy, pattern: patternNum}),
            })
        }
    }

}