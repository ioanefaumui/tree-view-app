import { AssetNode } from "./asset-node";
import { ComponentNode } from "./component-node";
import { LocationNode } from "./location-node";

export type TreeNode = LocationNode | AssetNode | ComponentNode;
