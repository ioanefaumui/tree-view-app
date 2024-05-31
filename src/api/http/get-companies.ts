import { CompanyDTO } from "../../types";
import { API } from "../constants";

export async function getCompanies(): Promise<CompanyDTO[]> {
  const response = await fetch(`${API}/companies`);
  const data = await response.json();
  return data;
}
