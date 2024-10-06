import { Category } from "../../../add-supply/interfaces/category/category";

export interface Supply {
  id: number;
  name: string;
  buy_price: number;
  category: Category;
}
