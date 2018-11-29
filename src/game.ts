import { World } from "./world";

const world = new World

var canvas = document.getElementById("canvas") as HTMLCanvasElement
var ctx = canvas.getContext("2d")!

world.start(ctx)
