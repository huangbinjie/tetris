import { ColorComponent } from "../components/Color";
import { DirectionComponent } from "../components/Direction";
import { ShapeComponent } from "../components/Shape";

export interface IShape {
  positionComponent: PositionComponent
  moveComponent?: MoveComponent
  colorComponent: ColorComponent
  directionComponent: DirectionComponent
  shapeComponent: ShapeComponent
}