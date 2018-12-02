import { ColorComponent } from "../../components/Color";
import { DirectionComponent } from "../../components/Direction";
import { ShapeComponent } from "../../components/Shape";
import { PositionComponent } from "../../components/Position";
import { NextComponent } from "../../components/Next";
import { MoveComponent } from "../../components/Move";

export interface IShape {
  positionComponent: PositionComponent
  colorComponent: ColorComponent
  nextComponent?: NextComponent
  moveComponent?: MoveComponent
  directionComponent: DirectionComponent
  shapeComponent: ShapeComponent
}