import {Vector} from "../Vector";

export class TimeBullet {
  constructor() {
    this.enemys = {
      "normal_1": [ ],
      "normal_1_1": [ ],
      "normal_2": [ ],
      "normal_2_1": [ ],
      "normal_4": [

      ],
      "boss_1": [
        {time: 1.0, type: "multiBall1", v: new Vector(0, 1), len: 10},
        {time: 1.2, type: "multiBall1", v: new Vector(0, 1), len: 10},
        {time: 1.4, type: "multiBall1", v: new Vector(0, 1), len: 10},
        {time: 1.6, type: "multiBall1", v: new Vector(0, 1), len: 10},
        // {time: 1.4, type: "multiBall1", v: new Vector(0, 1), len: 10},
        {time: 3.0, type: "multiBall1", v: new Vector(0, 1), len: 10},
        {time: 3.2, type: "multiBall1", v: new Vector(0, 1), len: 10},
        {time: 3.4, type: "multiBall1", v: new Vector(0, 1), len: 10},
        {time: 3.6, type: "multiBall1", v: new Vector(0, 1), len: 10},
        // {time: 3.4, type: "multiBall1", v: new Vector(0, 1), len: 10},
        // {time: 3, type: "fireBall", v: new Vector(0, 1), s: 400},
        // {time: 5, type: "fireBall", v: new Vector(0, 1), s: 400},
      ],
      "boss_2": [
        {time: 1.2, type: "multiBall2", v: new Vector(0, 1), len: 10},
        {time: 1.4, type: "multiBall2", v: new Vector(0, 1), len: 10},
        {time: 1.6, type: "multiBall2", v: new Vector(0, 1), len: 10},
        {time: 1.0, type: "multiBall2", v: new Vector(0, 1), len: 10},
        // {time: 1.4, type: "multiB2ll1", v: new Vector(0, 1), le10: 10},
        {time: 3.0, type: "multiBall2", v: new Vector(0, 1), len: 10},
        {time: 3.2, type: "multiBall2", v: new Vector(0, 1), len: 10},
        {time: 3.4, type: "multiBall2", v: new Vector(0, 1), len: 10},
        {time: 3.6, type: "multiBall2", v: new Vector(0, 1), len: 10},
      ],

      "boss_3": [
        // {time: 1.2, type: "multiBall2", v: new Vector(0, 1), len: 10},
        // {time: 1.4, type: "multiBall2", v: new Vector(0, 1), len: 10},
        // {time: 1.6, type: "multiBall2", v: new Vector(0, 1), len: 10},
        // {time: 1.0, type: "multiBall2", v: new Vector(0, 1), len: 10},
        // // {time: 1.4, type: "multiB2ll1", v: new Vector(0, 1), le10: 10},
        // {time: 3.0, type: "multiBall2", v: new Vector(0, 1), len: 10},
        // {time: 3.2, type: "multiBall2", v: new Vector(0, 1), len: 10},
        // {time: 3.4, type: "multiBall2", v: new Vector(0, 1), len: 10},
        // {time: 3.6, type: "multiBall2", v: new Vector(0, 1), len: 10},
      ],

    };

    for( let tm = 0; tm < 7; tm+= 0.5) {
      this.enemys.boss_1.push({time: tm, type: "iceBall", v: new Vector(-0.1, 1), s: 500});
      this.enemys.boss_1.push({time: tm, type: "iceBall", v: new Vector(0.1, 1), s: 500});
    }

    for( let tm = 0; tm < 7; tm+= 0.5) {
      this.enemys.boss_3.push({time: tm, type: "fireBall", v: new Vector(-0.1, 1), s: 500});
      this.enemys.boss_3.push({time: tm, type: "fireBall", v: new Vector(0.1, 1), s: 500});
    }

    this.enemys.boss_1.sort((a,b) => a.time < b.time ? -1 : 1);
    this.enemys.boss_2.sort((a,b) => a.time < b.time ? -1 : 1);
    this.enemys.boss_3.sort((a,b) => a.time < b.time ? -1 : 1);

    TimeBullet.getEnemy = (name) => [...this.enemys[name]]; // copy array
  }
}

const timeBullet = new TimeBullet();