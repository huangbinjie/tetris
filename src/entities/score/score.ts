import { IScore } from "./IScore";
import { ScoreComponent } from "../../components/Score";

export class ScoreEntity implements IScore {
  scoreComponent = new ScoreComponent(0)
}