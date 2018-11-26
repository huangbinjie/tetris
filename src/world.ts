import { IShape } from "@entities/IShape";
import { ActorSystem, AbstractActor, ActorRef } from "js-actor"

export class World {
  private entities: IShape[] = []
  private systemSystem = new ActorSystem("game")

  public addEntity(entity: IShape) {
    this.entities.push(entity)
  }

  public removeEntity(entity: IShape) {
    this.entities.splice(this.entities.indexOf(entity))
  }

  public getEntities() {
    return this.entities
  }

  public addSystem<T extends AbstractActor>(system: T) {
    return this.systemSystem.actorOf(system) as ActorRef<T>
  }

  public broadcast(message: object) {
    this.systemSystem.eventStream.emit("**", message)
  }
}