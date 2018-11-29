import { AbstractActor, ActorRef } from "js-actor"
import { World } from "../../world";
import { Start } from "../../Start";
import { Update } from "../../Update";

export class GravitySystem extends AbstractActor {
  constructor(
    private world: World
  ) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(Update, () => {
        
      })
      .build()
  }
}