import { Node } from "../types";

interface FilterNodesProps {
  nodes: Node[];
  searchTerm?: string;
  status?: Node["status"];
  sensorType?: Node["sensorType"];
}

export const filterNodes = ({
  nodes = [],
  searchTerm,
  sensorType,
  status,
}: FilterNodesProps) => {
  const result: Node[] = [];

  const filterHelper = (nodes: Node[]) => {
    return nodes.reduce((acc: Node[], node) => {
      const children = node.children ? filterHelper(node.children) : [];
      if (
        ((!searchTerm || node.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (!status || node.status === status) &&
          (!sensorType || node.sensorType === sensorType)) ||
        children.length > 0
      ) {
        acc.push({ ...node, children });
      }
      return acc;
    }, []);
  };

  result.push(...filterHelper(nodes));

  return result;
};
