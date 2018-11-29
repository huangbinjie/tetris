import { IText } from "./IText";
import { TextComponent } from "../../components/Text";

export class ScoreEntity implements IText {
  textComponent = new TextComponent(0)
}