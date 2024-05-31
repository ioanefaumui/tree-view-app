import React from "react";
import { TreeNodeType } from "./types";
import { TreeNode } from "./tree-node";

interface TreeViewProps {
  nodes: TreeNodeType[];
}

export const TreeView: React.FC<TreeViewProps> = ({ nodes }) => {
  return (
    <div>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};
