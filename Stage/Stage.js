/* eslint-disable require-yield, eqeqeq */

import {
  Color,
  Costume,
  Sound,
  Stage as StageBase,
  Trigger,
  Watcher,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);
    const [, prop] = args;
    this.vars.proportions = prop;
    this.costumes = [
      new Costume("backdrop1", "./Stage/costumes/backdrop1.svg", {
        x : 240,
        y : 180,
      }),
    ];

    this.triggers = [ new Trigger(Trigger.GREEN_FLAG, this.start) ];
  }

  * start() {
    this.sprites.Player1.setPlayer(1);
    this.sprites.Player2.setPlayer(2);
  }
}
