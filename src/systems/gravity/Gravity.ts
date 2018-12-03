import { AbstractActor, ActorRef } from "js-actor"
import { World } from "../../world";
import { Keydown } from "../input/messages/Keydown";
import { Keyup } from "../input/messages/Keyup";

export class GravitySystem extends AbstractActor {
  constructor(
    private world: World
  ) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(Keydown, ({ direction }) => {
        switch (direction) {
          case "up":
            this.world.gravity = 1
            break
          case "left":
            this.world.gravity = 1
            break
          case "right":
            this.world.gravity = 1
            break
          case "down":
            this.world.gravity = 10
            break
          default:
            this.world.gravity = 1
        }
        if (direction === "down") {
          this.world.gravity = 10
        }
      })
      .match(Keyup, ({ direction }) => {
        if (direction === "down") {
          this.world.gravity = 1
        }
      })
      .build()
  }
}