import { IComponent } from "./IComponent";

export class ShapeComponent implements IComponent{
  constructor(public value: number[][][]) { }
}