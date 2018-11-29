import { IEntity } from "../IEntity";
import { TextComponent } from "../../components/Text";

export interface IText extends IEntity {
  textComponent: TextComponent
}