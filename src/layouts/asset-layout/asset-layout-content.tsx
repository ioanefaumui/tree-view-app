import { useParams, useSearchParams } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { useDebounce, useTreeData } from "../../hooks";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { TreeNode } from "../../components";
import { filterNodes, getVisibleNodes } from "../../utils";
import { useExpandedNodes } from "../../hooks/use-expanded-nodes";
import { Node } from "../../types";
import searchIcon from "../../assets/search.png";
import wifi from "../../assets/wifi_tethering.png";
import receptor from "../../assets/receptor.png";

export function AssetLayoutContent() {
  const { id } = useParams();
  const companyId = id || "";
  const { treeData, isLoading } = useTreeData(companyId);
  const [searchParams] = useSearchParams();

  const [originalTree, setOriginalTree] = useState<Node[]>([]);
  const [filteredTree, setFilteredTree] = useState<Node[]>([]);
  const { expandedNodes, handleToggle, setExpandedNodes } = useExpandedNodes();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useLayoutEffect(() => {
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
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Buscar Ativo ou Local"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={searchIcon} alt="" />
        </div>
        <div className="wrapper">
          {isLoading ? (
            <p style={{ padding: "1rem", margin: "0", fontSize: "0.875rem" }}>
              Buscando dados...
            </p>
          ) : (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  className="List"
                  style={{ padding: "0.5rem 0.25rem" }}
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
          )}
        </div>
      </aside>
      <section>
        <header>
          <h2>MOTOR RT COAL AF01</h2>
        </header>
        <div className="wrapper">
          <div className="content">
            <div>
              <div className="top">
                <img
                  src="https://random.imagecdn.app/336/226"
                  alt=""
                  style={{
                    minWidth: 336,
                    minHeight: 226,
                    backgroundColor: "var(--var-border-card)",
                  }}
                />
                <div>
                  <div>
                    <h3>Tipo de Equipamento</h3>
                    <p>Motor Elétrico (Trifásico)</p>
                    <span className="divider"></span>
                    <h3>Responsáveis</h3>
                    <p>
                      <span>E</span>
                      Elétrica
                    </p>
                  </div>
                </div>
              </div>
              <span className="divider"></span>
              <div className="bottom">
                <div>
                  <h3>Sensor </h3>
                  <p>
                    <img src={wifi} alt="" /> HIO4510
                  </p>
                </div>
                <span className="divider-mob"></span>
                <div>
                  <h3>Receptor</h3>
                  <p>
                    <img src={receptor} alt="" /> EUH4R27
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
