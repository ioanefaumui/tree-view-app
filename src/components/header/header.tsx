import { Link, useSearchParams } from "react-router-dom";
import logo from "../../assets/logo-tractian.png";
import gold from "../../assets/icons/gold.png";
import styles from "./header.module.css";
import { useCompanies } from "../../hooks/use-companies";

export function Header() {
  const { companies } = useCompanies();
  const [searchParams] = useSearchParams();

  const unit = searchParams.get("unidade");

  return (
    <header className={styles.header}>
      <Link to={"/ativos"}>
        <img src={logo} alt="Tractian logo" />
      </Link>

      {companies.length > 0 && (
        <nav>
          <ul>
            {companies.map((c) => (
              <li key={c.id}>
                <Link
                  aria-current={unit === c.name}
                  state={{ companyId: c.id }}
                  to={{
                    pathname: "/ativos",
                    search: `unidade=${c.name}`,
                  }}
                >
                  <img src={gold} alt="Asset icon" />
                  <span>{c.name} Unit</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
