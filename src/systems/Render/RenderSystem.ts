import { AbstractActor } from "js-actor";
import { Update } from "../../Update";
import { World } from "../../world";

export class RenderSystem extends AbstractActor {
  private lastUpdated = 0
  constructor(private world: World) { super() }
  createReceive() {
    return this.receiveBuilder()
      .match(Update, () => {
        const current = this.world.getCurrentShape()
        const now = Date.now()
        if (current) {
          if (now - this.lastUpdated > 500 / this.world.gravity) {
            current.positionComponent.y += 1
            this.lastUpdated = now
          }
        }
      })
      .build()
  }
}