import { Component } from "./component";

type Type = "location" | "asset" | "component";

export interface Node extends Component {
  children: Node[];
  isExpanded: boolean;
  level: number;
  type: Type;
}
