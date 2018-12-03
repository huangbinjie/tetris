import { AbstractActor } from "js-actor"
import { World } from "../../world"
import { Keydown } from "../input/messages/Keydown";
import { Update } from "../../Update";

export class MoveSystem extends AbstractActor {
  constructor(
    private world: World
  ) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(Keydown, ({ direction: keyDirection }) => {
        const current = this.world.getCurrentShape()
        if (current) {
          const direction = current.directionComponent.value
          const shape = current.shapeComponent.value[direction]
          switch (keyDirection) {
            case "left": {
              const { x, y } = current.positionComponent
              const nextX = x - 1
              if (!this.world.occupied(nextX, y, shape)) {
                current.positionComponent.x -= 1
              }
              break
            }
            case "right": {
              const { x, y } = current.positionComponent
              const nextX = x + 1
              if (!this.world.occupied(nextX, y, shape)) {
                current.positionComponent.x += 1
              }
              break
            }
            case "up": {
              const { x, y } = current.positionComponent
              const nextShapeIdx = (current.directionComponent.value + 1) % 4
              const nextShape = current.shapeComponent.value[nextShapeIdx]
              if (!this.world.occupied(x, y, nextShape)) {
                current.directionComponent.value = (current.directionComponent.value + 1) % 4
              }
              break
            }
            default:
            case "down": {
              break
            }
          }
        }
      })
      .match(Update, () => {
        const current = this.world.getCurrentShape()
        const now = Date.now()
        if (current) {
          if (now - this.world.lastUpdated > 500 / this.world.gravity) {
            current.positionComponent.y += 1
            this.world.lastUpdated = now
          }
        }
      })
      .build()
  }
}