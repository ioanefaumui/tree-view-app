import { useLocation } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { useTreeView } from "../../hooks";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";
import { TreeNode } from "../../components";

export function AssetLayoutContent() {
  const { state } = useLocation();
  const { tree } = useTreeView(state?.companyId);

  const [originalTree, setOriginalTree] = useState([]);
  const [filteredTree, setFilteredTree] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
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

  const handleToggle = (nodeId) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  };

  const getVisibleNodes = (nodes = [], parentId = null, level = 0) => {
    return nodes.reduce((acc, node) => {
      if (node.parentId === parentId) {
        node.level = level;
        acc.push(node);
        if (expandedNodes[node.id] && node.children.length > 0) {
          acc = acc.concat(getVisibleNodes(node.children, node.id, level + 1));
        }
      }
      return acc;
    }, []);
  };

  const filterNodes = (nodes, searchTerm) => {
    const result = [];

    const filterHelper = (nodes) => {
      return nodes.reduce((acc, node) => {
        const children = node.children ? filterHelper(node.children) : [];
        if (
          node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  useEffect(() => {
    if (!debouncedSearchTerm) {
      setFilteredTree(originalTree); // Reset to original tree when search term is cleared
    } else {
      const filteredNodes = filterNodes(originalTree, debouncedSearchTerm);
      setFilteredTree(filteredNodes);
    }
  }, [debouncedSearchTerm, originalTree]);

  const visibleNodes = getVisibleNodes(filteredTree); // Calculate visible nodes directly

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
