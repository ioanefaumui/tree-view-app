import { useLocation, useSearchParams } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { useDebounce, useTreeData } from "../../hooks";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useCallback, useEffect, useState } from "react";
import { TreeNode } from "../../components";
import { filterNodes, getVisibleNodes } from "../../utils";
import { useExpandedNodes } from "../../hooks/use-expanded-nodes";
import { Node } from "../../types";

export function AssetLayoutContent() {
  const { state } = useLocation();
  const companyId = state?.companyId;
  const { treeData } = useTreeData(companyId);
  const [searchParams] = useSearchParams();

  const [originalTree, setOriginalTree] = useState<Node[]>([]);
  const [filteredTree, setFilteredTree] = useState<Node[]>([]);
  const { expandedNodes, handleToggle, setExpandedNodes } = useExpandedNodes();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (treeData.length > 0) {
      setOriginalTree(treeData);
      setFilteredTree(treeData);

      const expanded: { [key: string]: boolean } = {};
      const traverse = (nodes: Node[] = []) => {
        nodes.forEach((node) => {
          expanded[node.id] = node.isExpanded;
          if (node.children && node.children.length > 0) {
            traverse(node.children);
          }
        });
      };
      traverse(treeData);
      setExpandedNodes(expanded);
    }
  }, [treeData, setExpandedNodes]);

  const applyFilters = useCallback(() => {
    const status = searchParams.get("status") || "";
    const sensorType = searchParams.get("sensor") || "";
    const filteredNodes = filterNodes(
      originalTree || [],
      debouncedSearchTerm,
      status as Node["status"],
      sensorType as Node["sensorType"]
    );
    setFilteredTree(filteredNodes);
  }, [debouncedSearchTerm, searchParams, originalTree]);

  useEffect(() => {
    applyFilters();
  }, [debouncedSearchTerm, searchParams, originalTree, applyFilters]);

  const visibleNodes = getVisibleNodes(filteredTree, expandedNodes);

  return (
    <div className={styles.content}>
      <aside>
        <input
          type="text"
          placeholder="Buscar Ativo ou Local"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="wrapper">
          <AutoSizer>
            {({ height, width }) => (
              <List
                className="List"
                height={height}
                itemCount={visibleNodes.length}
                itemSize={30}
                width={width}
                innerElementType={"ul"}
              >
                {({ index, style }) => {
                  const node = visibleNodes[index];
                  const isExpanded = expandedNodes[node.id];
                  return (
                    <TreeNode
                      handleToggle={handleToggle}
                      isExpanded={isExpanded}
                      node={node}
                      style={style}
                    />
                  );
                }}
              </List>
            )}
          </AutoSizer>
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
