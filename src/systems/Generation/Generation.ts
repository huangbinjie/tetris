import { AbstractActor, ActorRef } from "js-actor";
import { NextShape } from "./messages/NextShape";
import { IShape } from "../../entities/shapes/IShape";
import { World } from "../../world";
import { IBlock } from "../../entities/shapes/I";
import { Update } from "../../Update";
import { NextComponent } from "../../components/Next";
import { MoveComponent } from "../../components/Move";

const shapes = [
  IBlock
]

function genShape() {
  const nextShapeIdx = Math.floor(Math.random() * 100) % shapes.length
  const nextShapeDirection = Math.floor(Math.random() * 100) % 4
  const shape: IShape = new shapes[nextShapeIdx](nextShapeDirection)
  return shape
}

export class GenerationSystem extends AbstractActor {
  constructor(private world: World) {
    super()
  }
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
      .match(Update, () => {
        const nextShape = genShape()
        const movingShape = this.world.getEntities().find(entity => !!entity.moveComponent)
        if (movingShape) {
          nextShape.nextComponent = new NextComponent
          this.world.addEntity(nextShape)
        } else {
          nextShape.moveComponent = new MoveComponent
          this.world.addEntity(nextShape)
          this.world.addEntity(genShape())
        }
      })
      .build()
  }
}