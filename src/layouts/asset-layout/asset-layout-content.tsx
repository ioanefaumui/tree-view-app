import { useLocation } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { useLocations } from "../../hooks";
// import VirtualizedList from "./virtu-list";
// import { useMemo } from "react";

const TreeNode = ({ node, level = 0 }) => {
  return (
    <details open style={{ padding: "1rem", cursor: "default" }}>
      <summary>{node.name}</summary>
      {node.children.length > 0 && (
        <div style={{ paddingLeft: 20 }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </details>
  );
};

const TreeView = ({ treeData }) => {
  return (
    <div>
      {(treeData || []).map((rootNode) => (
        <TreeNode key={rootNode.id} node={rootNode} />
      ))}
    </div>
  );
};

export function AssetLayoutContent() {
  const { state } = useLocation();
  const { treeData } = useLocations(state?.companyId);

  // const renderItem = (name: string) => (
  //   <div style={{ padding: 10, borderBottom: "1px solid black" }}>{name}</div>
  // );

  return (
    <div className={styles.content}>
      <aside>
        <input type="text" placeholder="Buscar Ativo ou Local" />
        <div className="wrapper">
          <div className="tree">
            {/* <menu> */}
            {/* {locations.map((c) => (
                <div key={c.id}>{c.name}</div>
              ))} */}
            {/* <VirtualizedList
              itemCount={locations.length}
              itemHeight={39}
              renderItem={renderItem}
            /> */}
            {/* </menu> */}
            <TreeView treeData={treeData} />
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
