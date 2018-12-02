import { AbstractActor } from "js-actor";
import { Update } from "../../Update";
import { World } from "../../world";
import { EliminateRow } from "./messages/EliminateRow";

export class DetectSystem extends AbstractActor {
  constructor(private world: World) { super() }
  createReceive() {
    return this.receiveBuilder()
      .match(Update, () => {
        const current = this.world.getCurrentShape()
        if (current) {
          const shape = current.shapeComponent.value[current.directionComponent.value]
          if (this.world.occupied(current.positionComponent.x, current.positionComponent.y + 1, shape)) {
            this.world.applyShape(current.positionComponent.x, current.positionComponent.y, shape)
            delete current.moveComponent
            const eliminatedLines = this.world.eliminateRow()
            this.world.broadcast(new EliminateRow(eliminatedLines))
          }
        }
      })
      .build()
  }
}