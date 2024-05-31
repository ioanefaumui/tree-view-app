import useSWR from "swr";
import { getLocations } from "../api/http";

export function useLocations(companyId: string) {
  const {
    isLoading,
    data = [],
    error,
  } = useSWR(
    () => "locations" + companyId,
    async () => await getLocations(companyId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const locations = data.length ? data : [];

  return {
    isLoading,
    locations,
    error,
  };
}
