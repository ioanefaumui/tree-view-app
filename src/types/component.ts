import { Asset } from "./asset";

export interface Component extends Asset {
  gatewayId: string;
}
