import { IShape } from "../IShape";
import { ColorComponent } from "../../../components/Color";
import { ShapeComponent } from "../../../components/Shape";
import { DirectionComponent } from "../../../components/Direction";
import { PositionComponent } from "../../../components/Position";

export class IBlock implements IShape {
  directionComponent = new DirectionComponent(0)
  positionComponent = new PositionComponent(0, 0)
  colorComponent = new ColorComponent("red")
  shapeComponent = new ShapeComponent([
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0]
    ]
  ])
  constructor(direction: number) {
    this.directionComponent = new DirectionComponent(direction)
  }
}