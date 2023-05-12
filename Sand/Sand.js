/* eslint-disable require-yield, eqeqeq */

import {
  Color,
  Costume,
  Sound,
  Sprite,
  Trigger,
  Watcher,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

/**
 * @param array {Array[number]}
 * @param arrayofarray {Array[Array[number]]}
 */
function arrayIn(array, arrayofarray) {
  return arrayofarray.some((v, _) => {
    return array[0] === v[0] && array[1] === v[1];
  });
}

export default class Sand extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("tile_0020", "./Sand/costumes/tile_0020.png", {
        x: 18,
        y: 18,
      }),
    ];

    this.sounds = [];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
    ];
  }

  *whenGreenFlagClicked() {
    yield* this.fillArea();
  }

  *left() {
    for (let i = 0; i < 20; i++) {
      this.warp(this.placeSand)();
      this.x -= 18;
    }
  }

  *down() {
    this.warp(this.placeSand)();
    this.y -= 18;
  }

  *right() {
    for (let i = 0; i < 20; i++) {
      this.warp(this.placeSand)();
      this.x += 18;
    }
  }

  *fillArea() {
    this.x += 18;
    this.y -= 18;
    while (!(this.x === 147 && this.y === -27)) {
      if (this.x === -213) {
        this.warp(this.right)();
        if (!(this.x === 147 && this.y === -27)) {
          this.warp(this.down)();
        }
      } else {
        this.warp(this.left)();
        if (!(this.x === 147 && this.y === -27)) {
          this.warp(this.down)();
        }
      }
    }
    this.warp(this.placeSand)();
    this.goto(-231, 171);
  }
  *placeSand() {
    if (
      !(
        arrayIn(
          [this.x, this.y],
          [
            [-213, 153],
            [-195, 153],
            [-213, 135],
            [147, -27],
            [129, -27],
            [147, -9],
          ]
        ) || this.touching(Color.rgb(159, 165, 189))
      ) &&
      Math.abs(noise.simplex2(this.x, this.y)) >= 0.2
    ) {
      this.createClone();
    }
  }
}
