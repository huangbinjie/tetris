import { AbstractActor, ActorRef } from "js-actor";
import { NextShape } from "./messages/NextShape";
import { IShape } from "../../entities/IShape";
import { World } from "../../world";
import { IBlock } from "../../entities/I/I";
import { Entity } from "entities/Entity";

export class GenerationSystem extends AbstractActor {
  createReceive() {
    return this.receiveBuilder()
      .answer(NextShape, resolve => () => {
        const shapes = [
          IBlock
        ]
        const nextShapeIdx = Math.floor(Math.random() * 100) % shapes.length
        const nextShapeDirection = Math.floor(Math.random() * 100) % 4
        resolve(new shapes[nextShapeIdx](nextShapeDirection))
      })
      .build()
  }
}