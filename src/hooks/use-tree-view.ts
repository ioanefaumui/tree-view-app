import useSWR from "swr";
import { getAssets, getLocations } from "../api/http";
import { useMemo } from "react";
import { buildTree } from "../layouts/asset-layout/build-tree";

interface TreeNode {
  id: string;
  name: string;
  parentId: string | null;
  locationId?: string;
  sensorType?: string | null;
  status?: string | null;
  gatewayId?: string;
  sensorId?: string;
  children?: TreeNode[];
}

export function useTreeView(companyId: string) {
  const fetcher = () => Promise.all([getLocations(companyId), getAssets(companyId)]);

  const { data } = useSWR("test" + companyId, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60 * 20,
  });

  const locations = data && data[0];
  const assets = data && data[1];

  const tree = useMemo(() => {
    if (!locations?.length || !assets?.length) return [];
    return buildTree(locations, assets);
  }, [locations, assets]);

  return {
    tree,
  };
}
