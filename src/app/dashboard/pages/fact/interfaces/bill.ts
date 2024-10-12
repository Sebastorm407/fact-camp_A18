import { Client } from "./client";
import { Employee } from "./employee";

export interface Bill {
  id: number;
  make_date: Date;
  amount: number;
  id_client: Client;
  id_employee: Employee;
}
