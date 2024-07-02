import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/dashboard/home/home.component';
import { ProductComponent } from './dashboard/dashboard/product/product.component';
import { GraphicComponent } from './dashboard/dashboard/graphic/graphic.component';
import { ReportComponent } from './dashboard/dashboard/report/report.component';
import { EmployeeComponent } from './dashboard/dashboard/employee/employee.component';
import { ClientComponent } from './dashboard/dashboard/client/client.component';
import { SupplierComponent } from './dashboard/dashboard/client/supplier/supplier.component';
import { SupplyComponent } from './dashboard/dashboard/product/supply/supply.component';
import { BuyerComponent } from './dashboard/dashboard/client/buyer/buyer.component';
import { FactComponent } from './dashboard/dashboard/fact/fact.component';
import { AddProductComponent } from './dashboard/dashboard/product/add-product/add-product.component';
import { AddSupplyComponent } from './dashboard/dashboard/product/add-supply/add-supply.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'product', component: ProductComponent},
  {path: 'graphic', component: GraphicComponent},
  {path: 'report', component: ReportComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'client', component: ClientComponent},
  {path: 'supplier', component: SupplierComponent},
  {path: 'supply', component: SupplyComponent},
  {path: 'buyer', component: BuyerComponent},
  {path: 'fact', component: FactComponent},
  {path: 'add-product', component: AddProductComponent},
  {path: 'add-supply', component: AddSupplyComponent}
];
