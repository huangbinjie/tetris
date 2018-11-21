import { AbstractActor } from "js-actor"

export class InputSystem extends AbstractActor {
  createReceive() {
    return this.receiveBuilder()
      .match(Input, () => {

      })
      .build()
  }
}