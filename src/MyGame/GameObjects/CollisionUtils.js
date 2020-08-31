let g_collisionCanvas = null;


export const isOverlapedRect = (rect1, rect2) => {
  let pps = [rect1, rect2];
  pps = pps.sort((a, b) => a.x < b.x ? -1 : 1); // 왼쪽 기준 한쪽 방향만 비교하도록 정렬
  let p2x = pps[1].x - pps[0].x;

  if (p2x >= 0 && p2x <= pps[0].w) {
    pps = pps.sort((a, b) => a.y < b.y ? -1 : 1);
    let p2y = pps[1].y - pps[0].y;
    if (p2y >= 0 && p2y <= pps[0].h) {
      return true;
    }
  }
  return false;
};

export const getCollisionCanvasData = (p1, p2) => {
  if (g_collisionCanvas == null) {
    g_collisionCanvas = document.createElement("canvas");
  }
  // 사진 넓이 => 작은 것 기준으로 정렬
  let pps = [p1, p2].sort((a, b) => (a.w * a.h) < (b.w * b.h) ? -1 : 1);

  g_collisionCanvas.setAttribute('width', pps[0].w);
  g_collisionCanvas.setAttribute('height', pps[0].h);

  const ctx = g_collisionCanvas.getContext("2d");
  ctx.clearRect(0, 0, pps[0].w, pps[0].h);
  ctx.drawImage(pps[0].image, pps[0].frame[0], pps[0].frame[1], pps[0].frame[2], pps[0].frame[3], 0, 0, pps[0].w, pps[0].h);
  ctx.globalCompositeOperation = "source-in";
  ctx.drawImage(pps[1].image, pps[1].frame[0], pps[1].frame[1], pps[1].frame[2], pps[1].frame[3], pps[1].x - pps[0].x, pps[1].y - pps[0].y, pps[1].w, pps[1].h);

  // rgba값으로 변환
  return { p1: pps[0], datas: ctx.getImageData(0, 0, g_collisionCanvas.width, g_collisionCanvas.height).data};
};

export const checkCollision = (p1, p2) => {
  if (isOverlapedRect(p1, p2)) {
    const baseRt = getCollisionCanvasData(p1, p2);
    return baseRt.datas.some(v => v > 0);
  }
  return false;
};

const drawCanvas2 = (p1, p2) => {
  const canvas = document.getElementById("canvas2");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 500, 800);
  ctx.drawImage(p1.image, p1.frame[0], p1.frame[1], p1.frame[2], p1.frame[3], 0, 0, p1.w, p1.h);
  ctx.drawImage(p2.image, p2.frame[0], p2.frame[1], p2.frame[2], p2.frame[3], p2.x - p1.x, p2.y - p1.y, p2.w, p2.h);
  ctx.drawImage(p1.image, 0, 0);
};

export const getCollisionPoint = (p1, p2, bTopDown = false) => {
  if (isOverlapedRect(p1, p2)) {
    const baseRt = getCollisionCanvasData(p1, p2);
    // // drawCanvas2(p1, p2);  // <-------- test code
    const found = baseRt.datas.findIndex(v => v > 0);
    if (found >= 0) {
      // dstCtx.drawImage(p2.image, p2.frame[0], p2.frame[1], p2.frame[2], p2.frame[3], p2.x - p1.x, p2.y - p1.y, p2.frame[2], p2.frame[3]);
      let lastIdx = bTopDown ? baseRt.datas.reverse().findIndex(v => v > 0) : found;
      let idx = bTopDown ? baseRt.datas.length - lastIdx : lastIdx;

      let lineWidth = (baseRt.p1.w * 4);
      let pt = {x: (idx % lineWidth) / 4, y: Math.floor(idx / lineWidth)};

      if( baseRt.p1 === p2) {
        //작은사이즈, 큰 사이즈 차이에 의한 상대위치 변경
        pt = {x: pt.x + (p2.x - p1.x), y: pt.y + (p2.y - p1.y)};
      }
      // console.log(baseRt.p2, `lastIdx:${lastIdx}, idx:${idx}, w: ${p1.w}, h${p1.h}, x:${pt.x}, y:${pt.y}`);
      return {x: pt.x + p1.x, y: pt.y + p1.y}; // (0,0) -> 화면의 상대 위치로 변경
    }
  }
  return null;
};

export const drawCircle = (ctx, x, y, radius, color) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
};

export const makeBulletImage = (r, colors) => {
  const imgCanvas = document.createElement("canvas");
  const size = (r+2) * 2;
  imgCanvas.setAttribute('width', size);
  imgCanvas.setAttribute('height', size);

  const imgCtx = imgCanvas.getContext("2d");
  drawCircle(imgCtx, size / 2, size / 2, r+2, colors[0]);
  drawCircle(imgCtx, size / 2, size / 2, r, colors[1]);

  let image = new Image();
  image.src = imgCanvas.toDataURL("image/png");
  return image;
};
