/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound,
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
    noise.seed(Math.round(Math.random() * 65536));
    this.vars.startX =
      this.stage.vars.proportions.width / -2 +
      this.stage.vars.proportions.blockSize / 2;
    this.vars.startY =
      this.stage.vars.proportions.height / 2 -
      this.stage.vars.proportions.blockSize / 2;
    this.goto(this.vars.startX, this.vars.startY);
    yield* this.fillArea();
  }

  *left() {
    for (let i = 0; i < 20; i++) {
      this.warp(this.placeSand)();
      this.x -= this.stage.vars.proportions.blockSize;
    }
  }

  *down() {
    this.warp(this.placeSand)();
    this.y -= this.stage.vars.proportions.blockSize;
  }

  *right() {
    for (let i = 0; i < 20; i++) {
      this.warp(this.placeSand)();
      this.x += this.stage.vars.proportions.blockSize;
    }
  }

  *fillArea() {
    this.y -= this.stage.vars.proportions.blockSize;
    this.x += this.stage.vars.proportions.blockSize;
    const endX = -this.x;
    const endY = -this.y;
    while (!(this.x === endX && this.y === endY)) {
      if (
        this.x ===
        this.stage.vars.proportions.width / -2 +
          this.stage.vars.proportions.blockSize * 1.5
      ) {
        this.warp(this.right)();
        if (!(this.x === endX && this.y === endY)) {
          this.warp(this.down)();
        }
      } else {
        this.warp(this.left)();
        if (!(this.x === endX && this.y === endY)) {
          this.warp(this.down)();
        }
      }
    }
    this.warp(this.placeSand)();
    this.goto(this.vars.startX, this.vars.startY);
  }
  *placeSand() {
    if (
      !(
        arrayIn(
          // Make sure no sand spawns in the top left or bottom right corners.
          [this.x, this.y],
          [
            // TOP LEFT
            [
              this.stage.vars.proportions.width / -2 +
                this.stage.vars.proportions.blockSize * 1.5,
              this.stage.vars.proportions.height / 2 -
                this.stage.vars.proportions.blockSize * 1.5,
            ],
            [
              this.stage.vars.proportions.width / -2 +
                this.stage.vars.proportions.blockSize * 1.5,
              this.stage.vars.proportions.height / 2 -
                this.stage.vars.proportions.blockSize * 2.5,
            ],
            [
              this.stage.vars.proportions.width / -2 +
                this.stage.vars.proportions.blockSize * 2.5,
              this.stage.vars.proportions.height / 2 -
                this.stage.vars.proportions.blockSize * 1.5,
            ],
            // BOTTOM RIGHT
            [
              this.stage.vars.proportions.width / 2 -
                this.stage.vars.proportions.blockSize * 1.5,
              this.stage.vars.proportions.height / -2 +
                this.stage.vars.proportions.blockSize * 1.5,
            ],
            [
              this.stage.vars.proportions.width / 2 -
                this.stage.vars.proportions.blockSize * 1.5,
              this.stage.vars.proportions.height / -2 +
                this.stage.vars.proportions.blockSize * 2.5,
            ],
            [
              this.stage.vars.proportions.width / 2 -
                this.stage.vars.proportions.blockSize * 2.5,
              this.stage.vars.proportions.height / -2 +
                this.stage.vars.proportions.blockSize * 1.5,
            ],
          ]
        ) || this.touching(Color.rgb(159, 165, 189))
      ) &&
      Math.abs(noise.simplex2(this.x, this.y)) >= 0.2
    ) {
      this.createClone();
    }
  }
}
