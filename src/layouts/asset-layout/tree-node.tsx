import React from "react";
import { TreeNodeType } from "./types";

interface TreeNodeProps {
  node: TreeNodeType;
}

export const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  return (
    <div style={{ paddingLeft: 20 }}>
      <details>
        <summary>{node.name}</summary>
        {node.children && node.children.length > 0 && (
          <div>
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} />
            ))}
          </div>
        )}
      </details>
    </div>
  );
};
