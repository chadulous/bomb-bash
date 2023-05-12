/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stone extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("tile_0020", "./Stone/costumes/tile_0020.png", {
        x: 18,
        y: 18
      })
    ];

    this.sounds = [new Sound("pop", "./Stone/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.i = 1;

    this.watchers.i = new Watcher({
      label: "Stone: i",
      style: "normal",
      visible: true,
      value: () => this.vars.i,
      x: 340,
      y: 96
    });
  }

  *whenGreenFlagClicked() {
    yield* this.buildBorders();
    yield* this.buildInnerMap();
  }

  *buildBorders() {
    this.createClone();
    while (!(this.y === -45)) {
      this.y -= 18;
      this.createClone();
    }
    while (!(this.x === 165)) {
      this.x += 18;
      this.createClone();
    }
    while (!(this.y === 171)) {
      this.y += 18;
      this.createClone();
    }
    while (!(this.x === -213)) {
      this.x -= 18;
      this.createClone();
    }
    this.goto(-231, 171);
  }

  *buildInnerMap() {
    this.y -= 36;
    this.x += 36;
    this.createClone();
    this.vars.i = 1;
    while (!(this.x === 129 && this.y === -9)) {
      if (this.toNumber(this.vars.i) % 2 === 0) {
        this.warp(this.innerBlocksLeft)();
      } else {
        this.warp(this.innerBlocksRight)();
      }
      if (!(this.x === 129 && this.y === -9)) {
        this.warp(this.innerBlocksDown)();
      }
      this.vars.i++;
    }
    this.vars.i = 1;
    this.goto(-231, 171);
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
