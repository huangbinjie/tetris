import { AbstractActor } from "js-actor"
import { BeginRender } from "./messages/BeginRender";

export class InputSystem extends AbstractActor {
  createReceive() {
    return this.receiveBuilder()
      .match(BeginRender, () => {

      })
      .build()
  }
}