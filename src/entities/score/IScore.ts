import { IEntity } from "../IEntity";
import { ScoreComponent } from "../../components/Score";

export interface IScore extends IEntity {
  scoreComponent: ScoreComponent
}