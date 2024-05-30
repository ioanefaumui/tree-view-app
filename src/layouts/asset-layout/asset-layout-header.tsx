import { useSearchParams } from "react-router-dom";
import styles from "./asset-layout.module.css";

export function AssetLayoutHeader() {
  const [searchParams] = useSearchParams();

  const unit = searchParams.get("unidade");

  return (
    <header className={styles.header}>
      <nav>
        <h1>Ativos</h1>
        {unit && (
          <>
            <span>/</span>
            <span>{`${unit} Unit`}</span>
          </>
        )}
      </nav>
    </header>
  );
}
