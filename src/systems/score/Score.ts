import { AbstractActor } from "js-actor";
import { EliminateRow } from "../detect/messages/EliminateRow";
import { Start } from "../../Start";
import { World } from "../../world";
import { ScoreEntity } from "../../entities/score/score";

export class ScoreSystem extends AbstractActor {
  constructor(private world: World) { super() }
  createReceive() {
    return this.receiveBuilder()
      .match(Start, () => {
        this.world.addEntity(new ScoreEntity)
      })
      .match(EliminateRow, ({ lines }) => {
        const score = this.world.getScore()
        const prevScore = score.scoreComponent.value
        const currentScore = prevScore + lines * 10
        score.scoreComponent.value = currentScore
      })
      .build()
  }
}