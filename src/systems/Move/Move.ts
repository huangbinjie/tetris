import { AbstractActor } from "js-actor"
import { World } from "../../world"
import { Input } from "../input/messages/Input"

export class MoveSystem extends AbstractActor {
  constructor(
    private world: World
  ) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(Input, ({ direction }) => {
        const canMoveShapes = this.world.getEntities().filter(shape => shape.moveComponent)
        canMoveShapes.forEach(shape => {
          switch (direction) {
            case "left":
              shape.positionComponent.x -= 1
              break
            case "right":
              shape.positionComponent.x += 1
              break
            case "up":
              shape.directionComponent.value = (shape.directionComponent.value + 1) % 4
              break
            case "down":
              shape.positionComponent.y += 1
              break
          }
        })
      })
      .build()
  }
}