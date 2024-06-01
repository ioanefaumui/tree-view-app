import { useEffect, useState } from "react";
import TreeNode from "./tree-node";

export const Tree: React.FC<{ data: any }> = ({ data }) => {
  const [visibleNodes, setVisibleNodes] = useState<any[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const itemHeight = 40;
  const buffer = 5;

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollPosition(event.currentTarget.scrollTop);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      const startIndex = Math.floor(scrollPosition / itemHeight);
      const endIndex = startIndex + Math.ceil(window.innerHeight / itemHeight) + buffer;
      const visibleData = data.slice(startIndex, endIndex);
      setVisibleNodes(visibleData);
    }, 100);

    return () => clearTimeout(debounce);
  }, [scrollPosition, data]);

  return (
    <div onScroll={handleScroll} style={{ height: "80vh", overflowY: "auto" }}>
      {visibleNodes.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};
