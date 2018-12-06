import { AbstractActor, ActorRef } from "js-actor";
import { NextShape } from "./messages/NextShape";
import { IShape } from "../../entities/shapes/IShape";
import { World } from "../../world";
import { IBlock } from "../../entities/shapes/I";
import { Update } from "../../Update";
import { NextComponent } from "../../components/Next";
import { MoveComponent } from "../../components/Move";
import { Start } from "../../Start";

const shapes = [
  IBlock
]

function genNextShape() {
  const nextShapeIdx = Math.floor(Math.random() * 100) % shapes.length
  const nextShapeDirection = Math.floor(Math.random() * 100) % 4
  const shape: IShape = new shapes[nextShapeIdx](nextShapeDirection)
  shape.nextComponent = new NextComponent
  return shape
}

export class GenerationSystem extends AbstractActor {
  constructor(private world: World) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(Start, () => {
        this.world.addEntity(genNextShape())
      })
      .match(Update, () => {
        const movingShape = this.world.getCurrentShape()
        const nextShape = this.world.getNextShape()
        if (movingShape) {
          return
        } else {
          if (nextShape) {
            delete nextShape.nextComponent
            nextShape.moveComponent = new MoveComponent
            this.world.addEntity(genNextShape())
          }
        }
      })
      .build()
  }
}