import { Country } from "./country";

export interface Department {
  id: number;
  name: string;
  id_country: Country
}
