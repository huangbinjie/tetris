import { AbstractActor, ActorRef } from "js-actor"
import { World } from "../../world";
import { Start } from "../../Start";
import { Input } from "./messages/Input";

export class InputSystem extends AbstractActor {
  constructor(
    private world: World
  ) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(Start, () => {
        window.addEventListener("keydown", event => {
          const direction = this.checkDirection(event.keyCode)
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
      })
      .build()
  }
  checkDirection(keyCode: number) {
    switch (keyCode) {
      default:
      case 37: return "left"
      case 40: return "down"
      case 38: return "up"
      case 39: return "right"
    }
  }
}