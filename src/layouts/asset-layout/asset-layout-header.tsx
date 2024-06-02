import { useSearchParams } from "react-router-dom";
import styles from "./asset-layout.module.css";
import { Button, Icon } from "../../components";

export function AssetLayoutHeader() {
  const [searchParams, setSearchParams] = useSearchParams();

  const unit = searchParams.get("unidade");

  const handleFilterToggle = (value: string) => {
    const currentParams = new URLSearchParams(searchParams);
    const filtros = currentParams.get("filtros");
    const filters = filtros ? filtros.split(",") : [];

    if (filters.includes(value)) {
      // Remove the filter
      const newFilters = filters.filter((filter) => filter !== value);
      if (newFilters.length > 0) {
        currentParams.set("filtros", newFilters.join(","));
      } else {
        currentParams.delete("filtros");
      }
    } else {
      // Add the filter
      filters.push(value);
      currentParams.set("filtros", filters.join(","));
    }

    setSearchParams(currentParams);
  };

  const isFilterActive = (value: string) => {
    const filtros = searchParams.get("filtros");
    const filters = filtros ? filtros.split(",") : [];
    return filters.includes(value);
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
          data-active={isFilterActive("Sensor de Energia")}
          className="energy-trigger"
          onClick={() => handleFilterToggle("Sensor de Energia")}
        >
          <Icon icon="tunderbolt" />
          <span>Sensor de Energia</span>
        </Button>

        <Button
          data-active={isFilterActive("Critico")}
          className="energy-trigger"
          onClick={() => handleFilterToggle("Critico")}
        >
          <Icon icon="critic" />
          <span>Crítico</span>
        </Button>
      </div>
    </header>
  );
}
