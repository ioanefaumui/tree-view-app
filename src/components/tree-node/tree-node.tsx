import { CSSProperties } from "react";
import expandArrow from "../../assets/icons/expand-arrow.png";
import { Node } from "../../types";
import { Icon } from "../icon";

interface TreeNodeProps {
  node: Node;
  style: CSSProperties;
  isExpanded: Node["isExpanded"];
  handleToggle: (nodeId: string) => void;
}

export function TreeNode({ node, style, isExpanded, handleToggle }: TreeNodeProps) {
  const hasChildren = node.children.length > 0;
  const hasParent = node.parentId ?? node.locationId;
  const statusColor = node.status !== "alert" ? "var(--var-ok)" : "var(--var-alert)";

  return (
    <li
      className="tree-node"
      onClick={() => handleToggle(node.id)}
      style={{
        ...style,
        width: "100vw",
        paddingLeft: `${node.level * 24}px`,
      }}
    >
      {hasChildren && (
        <span
          style={{
            transform: isExpanded ? "" : "rotate(-90deg)",
            position: "relative",
            paddingBlock: "4px",
          }}
        >
          <img src={expandArrow} alt="Tree node expansion indicator" />
        </span>
      )}
      <div
        style={{
          marginLeft: hasParent && !hasChildren ? "24px" : "",
        }}
      >
        <span className="node-icon-wrapper">
          <Icon icon={node.type} className="node-icon" />
        </span>
        <span className="tree-node-name">{node.name}</span>
        <Icon
          icon={node.sensorType}
          className="node-status"
          style={{
            color: statusColor,
            height: node.sensorType === "energy" ? "12px" : "8px",
            width: node.sensorType === "energy" ? "9" : "8px",
            marginLeft: "2px",
          }}
        />
      </div>
    </li>
  );
}
