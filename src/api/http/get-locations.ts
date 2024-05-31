import { API } from "../constants";

export async function getLocations(companyId: string) {
  const response = await fetch(`${API}/companies/${companyId}/locations`);
  const data = await response.json();
  return data;
}
