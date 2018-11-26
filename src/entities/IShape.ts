import { ColorComponent } from "../components/Color";

export interface IShape {
  positionComponent: PositionComponent
  moveComponent?: MoveComponent
  colorComponent: ColorComponent
}