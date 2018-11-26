import { AbstractActor } from "js-actor";
import { NextShape } from "./messages/NextShape";
import { I1Shape } from "entities/I/I1";
import { I2Shape } from "entities/I/I2";
import { I3Shape } from "entities/I/I3";
import { I4Shape } from "entities/I/I4";
import { L1Shape } from "entities/L/L1";
import { L2Shape } from "entities/L/L2";
import { L3Shape } from "entities/L/L3";
import { L4Shape } from "entities/L/L4";
import { O1Shape } from "entities/O/O1";
import { O2Shape } from "entities/O/O2";
import { O3Shape } from "entities/O/O3";
import { O4Shape } from "entities/O/O4";

export class GenerationSystem extends AbstractActor {
  createReceive() {
    return this.receiveBuilder()
      .answer(NextShape, resolve => () => {
        const shapes = [
          I1Shape, I2Shape, I3Shape, I4Shape,
          L1Shape, L2Shape, L3Shape, L4Shape,
          O1Shape, O2Shape, O3Shape, O4Shape
        ]
        const nextShapeIdx = Math.floor(Math.random() * 100) % shapes.length
        resolve(new shapes[nextShapeIdx])
      })
      .build()
  }
}