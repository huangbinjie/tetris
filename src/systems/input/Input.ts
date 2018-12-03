import { AbstractActor, ActorRef } from "js-actor"
import { World } from "../../world";
import { Start } from "../../Start";
import { Keydown } from "./messages/Keydown";
import { Keyup } from "./messages/Keyup";

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
          this.world.broadcast(new Keydown(this.checkDirection(event.keyCode)))
        })
        window.addEventListener("keyup", event => {
          this.world.broadcast(new Keyup(this.checkDirection(event.keyCode)))
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