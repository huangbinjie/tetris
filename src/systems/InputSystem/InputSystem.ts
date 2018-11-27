import { AbstractActor, ActorRef } from "js-actor"
import { BeginRender } from "../Render/messages/BeginRender";
import { World } from "../../world";
import { MoveSystem } from "../Move/Move";

export class InputSystem extends AbstractActor {
  constructor(
    private world: World,
    private moveRef: ActorRef<MoveSystem>
  ) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(BeginRender, () => {
        window.addEventListener("keydown", event => {
          event.keyCode
          this.moveRef.tell(new Input(this.checkDirection(event.keyCode)))
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