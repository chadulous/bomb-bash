/* eslint-disable require-yield, eqeqeq */

import {
  Color,
  Costume,
  Sound,
  Sprite,
  Trigger,
  Watcher,
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Player extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Player_1", "./Player/costumes/sprite_0.png", {
        x: 8,
        y: 8,
      }),
      new Costume("Player_2", "./Player/costumes/sprite_1.png", {
        x: 8,
        y: 8,
      }),
    ];
    this.vars.speed = 2.5;
    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.moveLoop),
      new Trigger(Trigger.GREEN_FLAG, this.placeLoop),
    ];
  }
  *placeLoop() {
    while (!this.player) {
      yield;
    }
    while (true) {
      if (this.keyPressed(this.vars.controls.place)) {
      }
      yield;
    }
  }
  *moveLoop() {
    this.effects.fisheye = 100;
    while (!this.player) {
      yield;
    }
    this.vars.controls = {
      up: this.player === 1 ? "w" : "up arrow",
      down: this.player === 1 ? "s" : "down arrow",
      left: this.player === 1 ? "a" : "left arrow",
      right: this.player === 1 ? "d" : "right arrow",
      place: this.player === 1 ? "f" : "/",
    };
    while (true) {
      const x =
        (this.keyPressed(this.vars.controls.right) -
          this.keyPressed(this.vars.controls.left)) *
        this.vars.speed *
        this.stage.vars.proportions.gameSize;
      const y =
        (this.keyPressed(this.vars.controls.up) -
          this.keyPressed(this.vars.controls.down)) *
        this.vars.speed *
        this.stage.vars.proportions.gameSize;
      this.x += x;
      while (
        this.touching([
          ...this.sprites.Stone.andClones(),
          ...this.sprites.Sand.andClones(),
        ])
      ) {
        this.x -= x / 5;
      }
      this.y += y;
      while (
        this.touching([
          ...this.sprites.Stone.andClones(),
          ...this.sprites.Sand.andClones(),
        ])
      ) {
        this.y -= y / 5;
      }
      yield;
    }
  }

  setPlayer(player) {
    switch (player) {
      case 1:
        this.costume = "Player_1";
        this.x =
          this.stage.vars.proportions.width / -2 +
          this.stage.vars.proportions.blockSize * 1.5;
        this.y =
          this.stage.vars.proportions.height / 2 -
          this.stage.vars.proportions.blockSize * 1.5;
        this.visible = true;
        break;
      case 2:
        this.costume = "Player_2";
        this.x =
          this.stage.vars.proportions.width / 2 -
          this.stage.vars.proportions.blockSize * 1.5;
        this.y =
          this.stage.vars.proportions.height / -2 +
          this.stage.vars.proportions.blockSize * 1.5;
        this.visible = true;
        break;
    }
    this.player = player;
  }
}
