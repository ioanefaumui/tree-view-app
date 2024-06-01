import { useLocation } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { useTreeView } from "../../hooks";
import { Tree } from "./tree";
import TreeNode from "./tree-node";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useState } from "react";

export function AssetLayoutContent() {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prevExpandedNodes) =>
      prevExpandedNodes.includes(nodeId)
        ? prevExpandedNodes.filter((id) => id !== nodeId)
        : [...prevExpandedNodes, nodeId]
    );
  };

  const { state } = useLocation();

  const { tree } = useTreeView(state?.companyId);

  const Row = ({ index, style }) => {
    const node = tree?.flattenedTree[index];
    if (!node) return null;
    return <TreeNode node={node} style={style} />;
  };

  return (
    <div className={styles.content}>
      <aside>
        <input type="text" placeholder="Buscar Ativo ou Local" />
        <div className="wrapper">
          <div className="tree">
            <AutoSizer>
              {({ height, width }) => {
                return (
                  <List
                    className="List"
                    height={height}
                    itemCount={tree.flattenedTree?.length || 0}
                    itemSize={19}
                    width={width}
                  >
                    {Row}
                  </List>
                );
              }}
            </AutoSizer>
          </div>
        </div>
      </aside>
      <section>
        <header>
          <h2>MOTOR RT COAL AF01</h2>
        </header>
        <div className="wrapper">
          <div className="content">
            <div>Content here</div>
          </div>
        </div>
      </section>
    </div>
  );
}
