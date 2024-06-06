import { Node } from "../types";

export const getVisibleNodes = (
  nodes: Node[],
  expandedNodes: { [key: string]: boolean },
  parentId = null,
  level = 0
) => {
  return nodes.reduce((acc: Node[], node) => {
    if (node.parentId === parentId) {
      node.level = level;
      acc.push(node);
      if (expandedNodes[node.id] && node.children.length > 0) {
        acc = acc.concat(
          getVisibleNodes(node.children, expandedNodes, node.id, level + 1)
        );
      }
    }
    return acc;
  }, []);
};
