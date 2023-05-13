import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Stone from "./Stone/Stone.js";
import Sand from "./Sand/Sand.js";
import Bomb from "./Bomb/Bomb.js";
import ExplosionParticle from "./ExplosionParticle/ExplosionParticle.js";

const gameSize = 1;
const base_height = 216;
const base_width = 414;
const height = gameSize * base_height;
const width = gameSize * base_width;
const blockSize = 18 * gameSize;

const stage = new Stage(
  { height, width, costumeNumber: 1 },
  { width, height, gameSize, blockSize }
);
noise.seed(Math.round(Math.random()) * 65536);
const sprites = {
  Stone: new Stone({
    x: -231,
    y: 171,
    direction: 90,
    costumeNumber: 1,
    size: 100 * gameSize,
    visible: true,
    layerOrder: 4,
  }),
  Sand: new Sand({
    x: -231,
    y: 171,
    direction: 90,
    costumeNumber: 1,
    size: 100 * gameSize,
    visible: true,
    layerOrder: 3,
  }),
  Bomb: new Bomb({
    x: -42,
    y: -81,
    direction: 90,
    costumeNumber: 1,
    size: 100 * gameSize,
    visible: true,
    layerOrder: 2,
  }),
  ExplosionParticle: new ExplosionParticle({
    x: -60,
    y: -36,
    direction: 90,
    costumeNumber: 1,
    size: 100 * gameSize,
    visible: true,
    layerOrder: 1,
  }),
};

const project = new Project(stage, sprites, {
  frameRate: 30, // Set to 60 to make your project run faster
});
export default project;
