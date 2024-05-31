import useSWR from "swr";
import { getCompanies } from "../api/http";

export function useCompanies() {
  const {
    isLoading,
    data = [],
    error,
  } = useSWR("companies", getCompanies, {
    revalidateOnFocus: false,
    dedupingInterval: 60000,
  });

  const sortedCompanies = data.sort((a, b) => a.name.localeCompare(b.name));

  return {
    isLoading,
    companies: sortedCompanies,
    error,
  };
}
