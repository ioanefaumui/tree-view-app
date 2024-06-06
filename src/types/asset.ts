import { Location } from "./location";

type SensorType = "energy" | "vibration";

type Status = "alert" | "operating";

export interface Asset extends Location {
  locationId: string | null;
  sensorId: string | null;
  sensorType: SensorType;
  status: Status;
}
