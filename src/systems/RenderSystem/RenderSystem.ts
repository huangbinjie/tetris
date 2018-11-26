import { AbstractActor, ActorRef } from "js-actor"
import { BeginRender } from "./messages/BeginRender";
import { GenerationSystem } from "systems/Generation/Generation";
import { NextShape } from "systems/Generation/messages/NextShape";
import { IShape } from "entities/IShape";

export class InputSystem extends AbstractActor {
  constructor(private generationRef: ActorRef<GenerationSystem>) {
    super()
  }
  createReceive() {
    return this.receiveBuilder()
      .match(BeginRender, async () => {
        const nextShape = await this.generationRef.ask<IShape>(NextShape)
      })
      .build()
  }
}