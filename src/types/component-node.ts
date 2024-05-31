export interface ComponentNode {
  id: string;
  gatewayId: string;
  locationId: string;
  name: string;
  parentId: string | null;
  sensorId: string;
  sensorType: string;
  status: string;
}
