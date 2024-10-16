import { Client } from "./client";
import { Employee } from "./employee";

export interface Bill {
  make_date: string;
  id_client: number;
  id_employee: number;
}
