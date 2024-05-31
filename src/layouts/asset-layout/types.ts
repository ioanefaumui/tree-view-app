interface LocationNode {
  id: string;
  name: string;
  parentId: string | null;
}

interface AssetNode {
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorType: string | null;
  status: string | null;
}

interface ComponentNode {
  gatewayId: string;
  id: string;
  locationId: string | null;
  name: string;
  parentId: string | null;
  sensorId: string;
  sensorType: string;
  status: string;
}

export type TreeNodeType = (LocationNode | AssetNode | ComponentNode) & {
  children?: TreeNodeType[];
};
