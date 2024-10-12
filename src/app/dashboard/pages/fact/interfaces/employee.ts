import { City } from "./city";
import { Gender } from "./gender";

export interface Employee {
    id: number;
    number_id: number;
    name: string;
    last_name: string;
    birthdate: Date;
    address: string;
    phone_number: number;
    id_city: City;
    id_gender: Gender

}
