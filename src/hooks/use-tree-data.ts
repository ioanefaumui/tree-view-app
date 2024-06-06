import useSWR from "swr";
import { getAssets, getLocations } from "../api/http";
import { useMemo } from "react";
import { buildTree } from "../layouts/asset-layout/build-tree";

export function useTreeData(companyId: string) {
  const fetcher = () => Promise.all([getLocations(companyId), getAssets(companyId)]);

  const { data } = useSWR("treeData" + companyId, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60 * 30,
  });

  const locations = data && data[0];
  const assets = data && data[1];

  const treeData = useMemo(() => {
    if (!locations?.length || !assets?.length) return [];
    return buildTree(locations, assets);
  }, [locations, assets]);

  return { treeData };
}
