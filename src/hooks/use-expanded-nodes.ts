import { useState } from "react";
import { Node } from "../types";

export const useExpandedNodes = () => {
  const [expandedNodes, setExpandedNodes] = useState<{ [nodeId: Node["id"]]: boolean }>(
    {}
  );

  const handleToggle = (nodeId: Node["id"]) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  return {
    expandedNodes,
    setExpandedNodes,
    handleToggle,
  };
};
