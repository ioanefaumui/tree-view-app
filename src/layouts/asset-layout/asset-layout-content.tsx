import { useLocation, useSearchParams } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { useTreeView } from "../../hooks";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";
import { TreeNode } from "../../components";
import { filterNodes, getVisibleNodes } from "../../utils";
import { useExpandedNodes } from "../../hooks/use-expanded-nodes";
import { Node } from "../../types";

export function AssetLayoutContent() {
  const { state } = useLocation();
  const { tree } = useTreeView(state?.companyId);
  const [searchParams, setSearchParams] = useSearchParams();

  const [originalTree, setOriginalTree] = useState([]);
  const [filteredTree, setFilteredTree] = useState([]);
  // const [expandedNodes, setExpandedNodes] = useState({});
  const { expandedNodes, handleToggle, setExpandedNodes } = useExpandedNodes();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Use debounce hook

  useEffect(() => {
    if (tree?.flattenedTree?.length > 0) {
      setOriginalTree(tree.flattenedTree); // Save the original tree data
      setFilteredTree(tree.flattenedTree); // Initialize the filtered tree with original data

      const expanded = {};
      const traverse = (nodes = []) => {
        nodes.forEach((node) => {
          expanded[node.id] = node.isExpanded;
          if (node.children && node.children.length > 0) {
            traverse(node.children);
          }
        });
      };
      traverse(tree.flattenedTree);
      setExpandedNodes(expanded);
    }
  }, [tree]);

  // const filterNodes = (nodes, searchTerm, status, sensorType) => {
  //   const result = [];

  //   const filterHelper = (nodes) => {
  //     return nodes.reduce((acc, node) => {
  //       const children = node.children ? filterHelper(node.children) : [];
  //       if (
  //         ((!searchTerm || node.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
  //           (!status || node.status === status) &&
  //           (!sensorType || node.sensorType === sensorType)) ||
  //         children.length > 0
  //       ) {
  //         acc.push({ ...node, children });
  //       }
  //       return acc;
  //     }, []);
  //   };

  //   result.push(...filterHelper(nodes));

  //   return result;
  // };

  const applyFilters = () => {
    const status = searchParams.get("status") || "";
    const sensorType = searchParams.get("sensor") || "";
    const filteredNodes = filterNodes(
      originalTree,
      debouncedSearchTerm,
      status as Node["status"],
      sensorType as Node["sensorType"]
    );
    setFilteredTree(filteredNodes);
  };

  useEffect(() => {
    applyFilters();
  }, [debouncedSearchTerm, searchParams, originalTree]);

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
