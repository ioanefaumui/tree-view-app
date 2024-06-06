import { Asset, Location, Node } from "../types";

export const buildTree = (locations: Location[], assets: Asset[]): Node[] => {
  const locationMap = new Map<Node["id"], Node>();
  const assetMap = new Map<Node["id"], Node>();
  const treeData: Node[] = [];

  locations.forEach((location) => {
    locationMap.set(location.id, {
      ...location,
      gatewayId: "",
      locationId: "",
      sensorId: "",
      sensorType: "" as Node["sensorType"],
      status: "" as Node["status"],
      type: "location",
      children: [],
      level: 0,
      isExpanded: true,
    });
  });

  assets.forEach((asset) => {
    const baseAsset: Node = {
      ...asset,
      gatewayId: "",
      type: "" as Node["type"],
      children: [],
      level: 0,
      isExpanded: true,
    };

    if (asset.sensorType) {
      baseAsset.type = "component";
    } else if (asset.parentId || asset.locationId) {
      baseAsset.type = "asset";
    } else {
      baseAsset.type = asset.sensorType ? "component" : "asset";
    }

    assetMap.set(asset.id, baseAsset);
  });

  const setLevelsAndFlatten = (node: Node, level: Node["level"]) => {
    node.level = level;
    treeData.push(node);
    node.children.forEach((child: Node) => setLevelsAndFlatten(child, level + 1));
  };

  assetMap.forEach((asset) => {
    if (asset.locationId) {
      const location = locationMap.get(asset.locationId);
      if (location) {
        location.children.push(asset);
        asset.parentId = asset.locationId;
      }
    } else if (asset.parentId) {
      const parentAsset = assetMap.get(asset.parentId);
      if (parentAsset) {
        parentAsset.children.push(asset);
      }
    }
  });

  locations.forEach((location) => {
    if (location.parentId) {
      const parent = locationMap.get(location.parentId);
      if (parent) {
        parent.children.push(locationMap.get(location.id)!);
      }
    }
  });

  locationMap.forEach((location) => {
    if (!location.parentId) {
      setLevelsAndFlatten(location, 0);
    }
  });

  assetMap.forEach((asset) => {
    if (!asset.locationId && !asset.parentId) {
      setLevelsAndFlatten(asset, 0);
    }
  });

  return treeData;
};
