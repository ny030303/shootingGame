class Pattern {
  constructor(pattern) {
    this.pattern = pattern;
  }

  getBezierCurvePoint(p1, p2, p3, p4, t) {
    const pow2 = (v) => Math.pow(v, 2);
    const pow3 = (v) => Math.pow(v, 3);
    return {
      x: pow3(1 - t) * p1.x + 3 * pow2(1 - t) * t * p2.x + 3 * (1 - t) * pow2(t) * p3.x + pow3(t) * p4.x,
      y: pow3(1 - t) * p1.y + 3 * pow2(1 - t) * t * p2.y + 3 * (1 - t) * pow2(t) * p3.y + pow3(t) * p4.y,
    }
  }

  getCount() {
    return Math.floor(this.pattern.length / 2 - 1);
  }

  getPoint(playT) {
    if (playT === undefined) playT = 0.0;
    if (Math.floor(playT) >= this.getCount()) {
      return null;
    }

    //console.log(playT);
    let lastIdx = (Math.floor(playT) + 1) * 2 + 1;
    let p1 = this.pattern[lastIdx - 3];
    let p2 = this.pattern[lastIdx - 2];
    let p3 = this.pattern[lastIdx - 1];
    let p4 = this.pattern[lastIdx];

    if (lastIdx > 3) {
      p1 = this.pattern[lastIdx - 2];
      p2 = {x: (p1.x - this.pattern[lastIdx - 3].x) + p1.x, y: (p1.y - this.pattern[lastIdx - 3].y) + p1.y};
    }

    let t = playT - Math.floor(playT);
    // console.log(t);
    let ptCurrent = this.getBezierCurvePoint(p1, p2, p3, p4, t);
    let ptNextMove = this.getBezierCurvePoint(p1, p2, p3, p4, t + 0.1);

    // console.log(JSON.stringify(ptCurrent), JSON.stringify(ptNextMove));
    let angle = Math.atan2(ptCurrent.x - ptNextMove.x, ptNextMove.y - ptCurrent.y) * 180 / Math.PI;
    return Object.assign(ptCurrent, {angle: angle});
  }

  getReversePoint(playT) {
    let pt = this.getPoint(playT);
    if (pt !== null) {
      pt.x = 500 - pt.x; // canvas.width = 500
    }
    return pt;
  }
}


export class Patterns {
  constructor() {
    this.patterns = [
      [
        {x: 434, y: -2, color: "blue"},
        {x: 8, y: 17, color: "red"},
        {x: -1, y: 103, color: "red"},
        {x: 62, y: 109, color: "blue"},
        {x: 499, y: 139, color: "red"},
        {x: 475, y: 198, color: "blue"},
        {x: 35, y: 212, color: "red"},
        {x: 16, y: 264, color: "blue"},
        {x: 494, y: 330, color: "red"},
        {x: 473, y: 387, color: "blue"},
        {x: -2, y: 386, color: "red"},
        {x: 16, y: 461, color: "blue"},
        {x: 494, y: 509, color: "red"},
        {x: 459, y: 573, color: "blue"},
        {x: 15, y: 568, color: "red"},
        {x: 31, y: 622, color: "blue"},
        {x: 453, y: 778, color: "red"},
        {x: 453, y: 801, color: "blue"},

      ],
      [
        // {x: -1, y: 36, color: "blue"},
        // {x: 471, y: 17, color: "red"},
        // {x: 501, y: 188, color: "red"},
        // {x: 465, y: 515, color: "blue"},
        // {x: 269, y: 169, color: "red"},
        // {x: 105, y: 447, color: "blue"},
        // {x: 330, y: 579, color: "red"},
        // {x: 108, y: 800, color: "blue"},
        {x: -2, y: 261, color: "blue"},
        {x: 72, y: 259, color: "red"},
        {x: 72, y: 258, color: "red"},
        {x: 131, y: 259, color: "blue"},
        {x: 177, y: 399, color: "red"},
        {x: 177, y: 500, color: "blue"},
        {x: 174, y: 636, color: "red"},
        {x: 174, y: 830, color: "blue"},
      ],
      [
        {x: 123, y: 0, color: "blue"},
        {x: 38, y: 30, color: "red"},
        {x: 17, y: 123, color: "red"},
        {x: 72, y: 129, color: "blue"},
        {x: 456, y: 85, color: "red"},
        {x: 466, y: 168, color: "blue"},
        {x: 106, y: 234, color: "red"},
        {x: 66, y: 250, color: "blue"},
        {x: 17, y: 325, color: "red"},
        {x: 53, y: 346, color: "blue"},
        {x: 380, y: 325, color: "red"},
        {x: 429, y: 352, color: "blue"},
        {x: 476, y: 498, color: "red"},
        {x: 394, y: 497, color: "blue"},
        {x: 63, y: 418, color: "red"},
        {x: 54, y: 524, color: "blue"},
        {x: 303, y: 641, color: "red"},
        {x: 51, y: 800, color: "blue"},
      ],
      [ // boss1 pattern
        {x: 249, y: 4, color: "blue"},
        {x: 250, y: 0, color: "red"},
        {x: 302, y: 67, color: "red"},
        {x: 310, y: 77, color: "blue"},
        {x: 436, y: 69, color: "red"},
        {x: 435, y: 110, color: "blue"},
        {x: 444, y: 130, color: "red"},
        {x: 252, y: 130, color: "blue"},
        {x: 444, y: 130, color: "red"},
        {x: 252, y: 130, color: "blue"},
        {x: 66, y: 150, color: "red"},
        {x: 65, y: 110, color: "blue"},
        {x: 190, y: 77, color: "red"},
        {x: 190, y: 77, color: "blue"},
        {x: 248, y: 4, color: "red"},
        {x: 250, y: 0, color: "blue"},
      ],
      [ // stage title pattern
        {x: 250, y: -2, color: "blue"},
        {x: 250, y: -2, color: "red"},
        {x: 249, y: 240, color: "red"},
        {x: 250, y: 240, color: "blue"},
        {x: 249, y: 240, color: "red"},
        {x: 250, y: 240, color: "blue"},
      ], // stage
      [
        {x: 308, y: 229, color: "blue"},
        {x: 392, y: 652, color: "red"},
        {x: 250, y: 725, color: "red"},
        {x: 250, y: 725, color: "blue"},
      ], // test
      [
        {x: 244, y: 3, color: "blue"},
        {x: 10, y: 36, color: "red"},
        {x: 32, y: 190, color: "red"},
        {x: 117, y: 219, color: "blue"},
        {x: 281, y: 281, color: "red"},
        {x: 402, y: 469, color: "blue"},
        {x: 442, y: 71, color: "red"},
        {x: 370, y: 38, color: "blue"},
        {x: 316, y: 7, color: "red"},
        {x: 246, y: 2, color: "blue"},
      ],

      [
        {x: 123, y: 0, color: "blue"},
        {x: 38, y: 30, color: "red"},
        {x: -2, y: 54, color: "red"},
        {x: 34, y: 84, color: "blue"},
        {x: 110, y: 83, color: "red"},
        {x: 143, y: 116, color: "blue"},
        {x: 5, y: 157, color: "red"},
        {x: 41, y: 187, color: "blue"},
        {x: 109, y: 186, color: "red"},
        {x: 139, y: 224, color: "blue"},
        {x: -1, y: 236, color: "red"},
        {x: 40, y: 270, color: "blue"},
        {x: 262, y: 348, color: "red"},
        {x: 245, y: 401, color: "blue"},
        {x: 36, y: 404, color: "red"},
        {x: 30, y: 450, color: "blue"},
        {x: 145, y: 707, color: "red"},
        {x: 51, y: 800, color: "blue"},
      ], // 처음 왼쪽시작, 와따갔따 미드 갔다 오는
      [
        {x: 17, y: -2, color: "blue"},
        {x: 82, y: 14, color: "red"},
        {x: 107, y: 45, color: "red"},
        {x: 106, y: 83, color: "blue"},
        {x: 170, y: 147, color: "red"},
        {x: 168, y: 202, color: "blue"},
        {x: 25, y: 251, color: "red"},
        {x: 67, y: 307, color: "blue"},
        {x: 70, y: 392, color: "red"},
        {x: 76, y: 466, color: "blue"},
        {x: 186, y: 463, color: "red"},
        {x: 181, y: 547, color: "blue"},
        {x: 370, y: 648, color: "red"},
        {x: 353, y: 763, color: "blue"},
      ], // 처음 왼쪽 시작, 꾸불꾸불 가다가 오른쪽으로 내려오는
    ];
    Patterns.list = [];
    this.patterns.forEach(p => Patterns.list.push(new Pattern(p)));
  }
}

export const patternList = new Patterns();