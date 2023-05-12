/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class ExplosionParticle extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("tile_0005", "./ExplosionParticle/costumes/tile_0005.png", {
        x: 14,
        y: 14
      })
    ];

    this.sounds = [];

    this.triggers = [];
  }
}
