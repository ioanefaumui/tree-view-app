import { useLocation } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { useTreeView } from "../../hooks";
import { TreeView } from "./tree-view";

export function AssetLayoutContent() {
  const { state } = useLocation();

  const { treeData } = useTreeView(state?.companyId);

  return (
    <div className={styles.content}>
      <aside>
        <input type="text" placeholder="Buscar Ativo ou Local" />
        <div className="wrapper">
          <div className="tree">
            <TreeView nodes={treeData} />
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
