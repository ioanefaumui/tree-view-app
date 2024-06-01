import { useLocation } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { useTreeView } from "../../hooks";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useState, useMemo, useLayoutEffect } from "react";

export function AssetLayoutContent() {
  const { state } = useLocation();
  const { tree } = useTreeView(state?.companyId);

  const flattenedTree = tree?.flattenedTree;

  const [expandedNodes, setExpandedNodes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useLayoutEffect(() => {
    if (flattenedTree?.length > 0) {
      const expanded = {};
      const traverse = (nodes = []) => {
        nodes.forEach((node) => {
          expanded[node.id] = node.isExpanded;
          if (node.children && node.children.length > 0) {
            traverse(node.children);
          }
        });
      };
      traverse(flattenedTree);
      setExpandedNodes(expanded);
    }
  }, [flattenedTree]);

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
    if (!searchTerm) {
      return nodes;
    }

    return nodes.reduce((acc, node) => {
      if (node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        acc.push(node);
      } else if (node.children) {
        const filteredChildren = filterNodes(node.children, searchTerm);
        if (filteredChildren.length > 0) {
          node.children = filteredChildren;
          acc.push(node);
        }
      }
      return acc;
    }, []);
  };

  const visibleNodes = useMemo(() => {
    if (!searchTerm) {
      return getVisibleNodes(flattenedTree);
    }
    const filteredNodes = filterNodes(flattenedTree, searchTerm);
    return getVisibleNodes(filteredNodes);
  }, [flattenedTree, expandedNodes, searchTerm]);

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
                itemSize={19}
                width={width}
              >
                {({ index, style }) => {
                  const node = visibleNodes[index];
                  return (
                    <div
                      style={{
                        ...style,
                        paddingLeft: `${node.level * 20}px`,
                      }}
                    >
                      <div onClick={() => handleToggle(node.id)}>
                        {node.children.length > 0 && (
                          <span>{expandedNodes[node.id] ? "-" : "+"}</span>
                        )}
                        {node.name}
                      </div>
                    </div>
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
