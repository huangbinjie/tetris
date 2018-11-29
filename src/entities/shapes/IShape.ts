import { ColorComponent } from "../../components/Color";
import { DirectionComponent } from "../../components/Direction";
import { ShapeComponent } from "../../components/Shape";
import { PositionComponent } from "../../components/Position";
import { MoveComponent } from "../../components/Move";
import { NextComponent } from "../../components/Next";

export interface IShape {
  positionComponent: PositionComponent
  moveComponent?: MoveComponent
  colorComponent: ColorComponent
  nextComponent?: NextComponent
  directionComponent: DirectionComponent
  shapeComponent: ShapeComponent
}