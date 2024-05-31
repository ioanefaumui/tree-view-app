import useSWR from "swr";
import { AssetNode, ComponentNode, LocationNode } from "../types";
import { getAssets, getLocations } from "../api/http";
import { useMemo } from "react";

interface ApiResponse {
  locations: LocationNode[];
  assets: (AssetNode | ComponentNode)[];
}

// const buildTree = (
//   locations: ApiResponse["locations"],
//   assets: ApiResponse["assets"]
// ): TreeNode[] => {
//   const locationMap: { [key: string]: LocationNode } = {};
//   const assetMap: { [key: string]: AssetNode } = {};
//   const roots: TreeNode[] = [];

//   locations.forEach((location) => {
//     locationMap[location.id] = { ...location, children: [] };
//   });

//   assets.forEach((asset) => {
//     if (asset.sensorType === null) {
//       assetMap[asset.id] = { ...asset, children: [] };
//     }
//   });

//   assets.forEach((asset) => {
//     if (asset.sensorType !== null) {
//       const parent = asset.parentId
//         ? assetMap[asset.parentId]
//         : assetMap[asset.locationId];
//       if (parent) {
//         parent.children!.push(asset);
//       }
//     }
//   });

//   assets.forEach((asset) => {
//     if (asset.sensorType === null) {
//       const parent = asset.parentId
//         ? assetMap[asset.parentId]
//         : locationMap[asset.locationId];
//       if (parent) {
//         parent.children!.push(assetMap[asset.id]);
//       }
//     }
//   });

//   locations.forEach((location) => {
//     if (location.parentId) {
//       if (locationMap[location.parentId]) {
//         locationMap[location.parentId].children!.push(locationMap[location.id]);
//       }
//     } else {
//       roots.push(locationMap[location.id]);
//     }
//   });

//   return roots;
// };

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

function buildTree(nodes: TreeNode[]): TreeNode[] {
  const nodeMap = new Map<string, TreeNode & { children?: TreeNode[] }>();

  nodes.forEach((node) => {
    nodeMap.set(node.id, { ...node, children: [] });
  });

  const tree: TreeNode[] = [];

  nodeMap.forEach((node) => {
    if (node.parentId) {
      const parent = nodeMap.get(node.parentId);
      if (parent) {
        parent.children?.push(node);
      }
    } else {
      tree.push(node);
    }
  });

  return tree;
}

export function useTreeView(companyId: string) {
  const fetcher = () => Promise.all([getLocations(companyId), getAssets(companyId)]);

  const { data } = useSWR("test" + companyId, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60 * 20,
  });

  const locations = data && data[0];
  const assets = data && data[1];

  const treeData = useMemo(() => {
    if (!locations?.length || !assets?.length) return [];
    return buildTree([...locations, ...assets]);
  }, [locations, assets]);

  return {
    treeData,
  };
}
