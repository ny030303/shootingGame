import {getCollisionPoint, makeBulletImage} from "../CollisionUtils";
import {Item} from "./Item";

export class ItemManager {
  constructor(parent, imgs) {
    this.parent = parent;
    this.itemList = [];

    this.imageList = {
      item_1: imgs[0],
      item_2: imgs[1],
    };
  }


  createItem(x, y, w, h, type) {
    const listType = {
      item_1: this.itemList,
      item_2: this.itemList,
    };

    let list = listType[type];
    let item = list.find(x => !x.active);

    if (item === undefined) {
      switch (type) {
        case "item_1":
        case "item_2":
          let bulletImage = this.imageList[type];
          item = new Item(bulletImage, this);
          list.push(item);
          break;
      }

    }

    item.setActive(x, y, w, h, type);
  }

  update(d) {
    let allBullets = [
      ...this.itemList.filter(b => b.active)
    ];

    this.itemList.filter(i => i.active).forEach(i => {
      let p2 = {
        x: i.x, y: i.y, w: i.w, h: i.h, // destination image position
        frame: [0, 0, i.w, i.h],
        image: i.img
      };
      let player = this.parent.player;
      let p1 = {
        x: player.x, y: player.y, w: player.w, h: player.h, // destination image position
        frame: [0, 0, player.img.width, player.img.height], // source image position
        image: player.img // image element
      };
      let point = getCollisionPoint(p1, p2, true);

      if (point != null) {
        i.active = false;
        i.soundPlay();
        player.upgrade(i.type);
      }
    });

    this.itemList.forEach(i => i.update(d));
  }

  clear() {
    this.itemList.forEach(e => e.active = false);
  }


  render(ctx) {
    this.itemList.forEach(i => i.render(this.parent.ctx));
  }

}