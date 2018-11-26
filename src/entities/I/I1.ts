import { IShape } from "../IShape";
import { ColorComponent } from "../../components/Color";
import { ShapeComponent } from "../../components/Shape";

export class I1Shape implements IShape {
  positionComponent = new PositionComponent(0, 0)
  colorComponent = new ColorComponent("red")
  moveComponent = new MoveComponent()
  shapeComponent = new ShapeComponent([
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])
}