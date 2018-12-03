import { IComponent } from "./IComponent";

export class PositionComponent implements IComponent{
  constructor(public x: number, public y: number) { }
}