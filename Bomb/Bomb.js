/* eslint-disable require-yield, eqeqeq */

import {
  Color,
  Costume,
  Sound,
  Sprite,
  Trigger,
  Watcher,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Bomb extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("tile_0016", "./Bomb/costumes/tile_0016.png", {
        x : 16,
        y : 16,
      }),
    ];

    this.triggers = [ new Trigger(Trigger.CLONE_START, this.onCreate) ];
  }

  * onCreate() { this.effects.mosaic += 25; }
}
