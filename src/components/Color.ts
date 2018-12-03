import { IComponent } from "./IComponent";

export class ColorComponent implements IComponent {
  constructor(public value: string) { }
}