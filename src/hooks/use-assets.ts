import useSWR from "swr";
import { getAssets } from "../api/http";

export function useAssets(companyId: string) {
  const {
    isLoading,
    data = [],
    error,
  } = useSWR(
    () => "assets" + companyId,
    async () => await getAssets(companyId),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  const assets = data.length ? data : [];

  return {
    isLoading,
    assets,
    error,
  };
}
