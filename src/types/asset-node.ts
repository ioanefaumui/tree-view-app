import { TreeNode } from "./tree-node";

export interface AssetNode {
  id: string;
  name: string;
  locationId: string;
  parentId: string | null;
  sensorType: string | null;
  status: string | null;
  children?: TreeNode[];
}
