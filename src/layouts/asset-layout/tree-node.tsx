const TreeNode: React.FC<{ node: any; style: any }> = ({ node, style }) => {
  if (!node) return null;

  const isChildNode = Boolean(node?.parentId) || Boolean(node?.locationId);

  const paddingLeft = isChildNode ? `${node.level * 20}px` : "0px";

  return (
    <details
      open
      style={{ ...style, paddingLeft }}
      data-is-parent={!isChildNode}
      data-level={node.level}
    >
      <summary>
        <span className="icon">{getIcon(node)}</span>
        <span className="name">{node.name}</span>
      </summary>
    </details>
  );
};

const getIcon = (node: any) => {
  if (node?.type === "location") return "📍";
  if (node?.type === "asset") return "⚙️";
  if (node?.type === "component") return "🔧";
  return "📁";
};

export default TreeNode;
