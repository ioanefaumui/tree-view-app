export const buildTree = (
  locations: any[],
  assets: any[]
): { data: any[]; totalNodes: number; flattenedTree: any[] } => {
  const locationMap = new Map();
  const assetMap = new Map();
  let totalNodes = 0;
  const flattenedTree: any[] = [];

  // Initialize the location map
  locations.forEach((location) => {
    locationMap.set(location.id, {
      ...location,
      type: "location",
      children: [],
      level: 0, // Temporary level, will be updated
    });
    totalNodes += 1; // Increment node count for each location
  });

  // Initialize the asset map and classify assets and components
  assets.forEach((asset) => {
    if (asset.sensorType) {
      // It's a component
      assetMap.set(asset.id, {
        ...asset,
        type: "component",
        children: [],
        level: 0, // Temporary level, will be updated
      });
    } else if (asset.parentId) {
      // It's a sub-asset
      assetMap.set(asset.id, {
        ...asset,
        type: "asset",
        children: [],
        level: 0, // Temporary level, will be updated
      });
    } else if (asset.locationId) {
      // It's an asset with a location
      assetMap.set(asset.id, {
        ...asset,
        type: "asset",
        children: [],
        level: 0, // Temporary level, will be updated
      });
    } else {
      // Unlinked asset/component
      assetMap.set(asset.id, {
        ...asset,
        type: "unlinked",
        children: [],
        level: 0, // Temporary level, will be updated
      });
    }
    totalNodes += 1; // Increment node count for each asset/component
  });

  // Function to set levels recursively and flatten the tree
  const setLevelsAndFlatten = (node: any, level: number) => {
    node.level = level;
    flattenedTree.push(node);
    node.children.forEach((child: any) => setLevelsAndFlatten(child, level + 1));
  };

  // Add assets and components to the appropriate locations or assets
  assetMap.forEach((asset) => {
    if (asset.locationId) {
      const location = locationMap.get(asset.locationId);
      if (location) {
        location.children.push(asset);
      }
    } else if (asset.parentId) {
      const parentAsset = assetMap.get(asset.parentId);
      if (parentAsset) {
        parentAsset.children.push(asset);
      }
    }
  });

  // Nest sub-locations under their parent locations
  locations.forEach((location) => {
    if (location.parentId) {
      const parent = locationMap.get(location.parentId);
      if (parent) {
        parent.children.push(locationMap.get(location.id));
      }
    }
  });

  // Set the levels for all nodes and count nodes
  locationMap.forEach((location) => {
    if (!location.parentId) {
      setLevelsAndFlatten(location, 0); // Set level 0 for top-level locations
    }
  });

  // Add unlinked assets/components to the flattened tree
  assetMap.forEach((asset) => {
    if (asset.type === "unlinked") {
      setLevelsAndFlatten(asset, 0); // Set level 0 for unlinked assets/components
    }
  });

  // Filter the top-level locations and return the tree structure, total nodes, and flattened tree
  const data = Array.from(locationMap.values()).filter((location) => !location.parentId);
  return { data, totalNodes, flattenedTree };
};
