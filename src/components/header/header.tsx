import { Link } from "react-router-dom";
import logo from "../../assets/logo-tractian.png";
import gold from "../../assets/icons/gold.png";
import "./header.css";
import { useCompanies } from "../../hooks/use-companies";

export function Header() {
  const { companies } = useCompanies();

  return (
    <header>
      <Link to={"/"}>
        <img src={logo} alt="Tractian logo" />
      </Link>

      {companies.length > 0 && (
        <nav>
          <ul>
            {companies.map((c) => (
              <li key={c.id}>
                <Link to={"/"}>
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
