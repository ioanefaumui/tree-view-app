import { TreeNode } from "./tree-node";

export interface LocationNode {
  id: string;
  name: string;
  parentId: string | null;
  children?: TreeNode[];
}
