/* eslint-disable require-yield, eqeqeq */

import {
  Color,
  Costume,
  Sound,
  Sprite,
  Trigger,
  Watcher,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stone extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("tile_0020", "./Stone/costumes/tile_0020.png", {
        x: 18,
        y: 18,
      }),
    ];

    this.sounds = [new Sound("pop", "./Stone/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    this.vars.startY =
      this.stage.vars.proportions.height / 2 -
      this.stage.vars.proportions.blockSize / 2;
    this.vars.startX =
      this.stage.vars.proportions.width / -2 +
      this.stage.vars.proportions.blockSize / 2;
    this.goto(this.vars.startX, this.vars.startY);
    console.log(this.vars.startX + this.stage.vars.proportions.blockSize * 22);
    yield* this.buildBorders();
    // yield* this.buildInnerMap();
  }

  *buildBorders() {
    this.createClone();
    while (
      !(
        this.y ===
        this.vars.startY - this.stage.vars.proportions.blockSize * 11
      )
    ) {
      this.y -= this.stage.vars.proportions.blockSize;
      this.createClone();
    }
    while (
      !(
        this.x ===
        this.vars.startX + this.stage.vars.proportions.blockSize * 22
      )
    ) {
      this.x += this.stage.vars.proportions.blockSize;
      this.createClone();
    }
    while (!(this.y === this.vars.startY)) {
      this.y += this.stage.vars.proportions.blockSize;
      this.createClone();
    }
    while (!(this.x === this.vars.startX)) {
      this.x -= this.stage.vars.proportions.blockSize;
      this.createClone();
    }
    this.goto(this.vars.startX, this.vars.startY);
  }

  *buildInnerMap() {
    this.y -= this.stage.vars.blockSize * 2;
    this.x += this.stage.vars.blockSize * 2;
    this.createClone();
    let i = 1;
    while (!(this.x === 129 && this.y === -9)) {
      if (this.toNumber(i) % 2 === 0) {
        this.warp(this.innerBlocksLeft)();
      } else {
        this.warp(this.innerBlocksRight)();
      }
      if (!(this.x === 129 && this.y === -9)) {
        this.warp(this.innerBlocksDown)();
      }
      i++;
    }
    i = 1;
    this.goto(0, this.vars.startY);
  }

  *innerBlocksRight() {
    while (!(this.x === 129)) {
      this.x += 36;
      this.createClone();
    }
  }

  *innerBlocksDown() {
    this.y -= 36;
    this.createClone();
  }

  *innerBlocksLeft() {
    while (!(this.x === -195)) {
      this.x -= 36;
      this.createClone();
    }
  }
}
