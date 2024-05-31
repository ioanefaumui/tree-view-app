import { API } from "../constants";

export async function getAssets(companyId: string) {
  const response = await fetch(`${API}/companies/${companyId}/assets`);
  const data = await response.json();
  return data;
}
