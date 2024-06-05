import { useParams, useSearchParams } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { Button, Icon } from "../../components";
import { useCompanies } from "../../hooks";

export function AssetLayoutHeader() {
  const { id } = useParams();
  const { companies } = useCompanies();
  const [searchParams, setSearchParams] = useSearchParams();

  const unit = companies.find((c) => c.id === id)?.name;

  const handleSearchParams = (param: "energy" | "alert") => {
    const sensor = searchParams.get("sensor");
    const status = searchParams.get("status");

    if (!sensor && param === "energy") {
      searchParams.append("sensor", param);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("sensor", param);
      setSearchParams(searchParams);
    }

    if (!status && param === "alert") {
      searchParams.append("status", param);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("status", param);
      setSearchParams(searchParams);
    }
  };

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

      <div className="filters">
        <Button
          data-active={!!searchParams.get("sensor")}
          className="energy-trigger"
          onClick={() => handleSearchParams("energy")}
        >
          <Icon icon="tunderbolt" />
          <span>Sensor de Energia</span>
        </Button>

        <Button
          data-active={!!searchParams.get("status")}
          className="energy-trigger"
          onClick={() => handleSearchParams("alert")}
        >
          <Icon icon="critic" />
          <span>Crítico</span>
        </Button>
      </div>
    </header>
  );
}
