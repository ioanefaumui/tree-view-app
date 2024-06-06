import { Header } from "../../components";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useCompanies } from "../../hooks";
import { useEffect } from "react";

export function MainLayout() {
  const { isLoading, companies } = useCompanies();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (companies.length > 0 && !id) {
      return navigate({
        pathname: `/ativos/${id || companies[1].id}`,
      });
    }
  }, [companies, navigate, id]);

  return (
    <>
      <Header />
      {isLoading ? (
        <p style={{ padding: "1rem", margin: "0" }}>Carregando...</p>
      ) : (
        <Outlet />
      )}
    </>
  );
}
