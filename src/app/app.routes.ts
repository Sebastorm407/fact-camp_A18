import { Routes } from '@angular/router';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { ProductComponent } from './dashboard/pages/product/product.component';
import { GraphicComponent } from './dashboard/pages/graphic/graphic.component';
import { ReportComponent } from './dashboard/pages/report/report.component';
import { EmployeeComponent } from './dashboard/pages/employee/employee.component';
import { ClientComponent } from './dashboard/pages/client/client.component';
import { SupplierComponent } from './dashboard/pages/client/supplier/supplier.component';
import { SupplyComponent } from './dashboard/pages/product/supply/supply.component';
import { BuyerComponent } from './dashboard/pages/client/buyer/buyer.component';
import { FactComponent } from './dashboard/pages/fact/fact.component';
import { AddProductComponent } from './dashboard/pages/product/add-product/add-product.component';
import { AddSupplyComponent } from './dashboard/pages/product/add-supply/add-supply.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'product', component: ProductComponent, children: [
      {path: 'add-product', component: AddProductComponent},
      {path: 'add-supply', component: AddSupplyComponent}
    ]},
    {path: 'graphic', component: GraphicComponent},
    {path: 'report', component: ReportComponent},
    {path: 'employee', component: EmployeeComponent},
    {path: 'client', component: ClientComponent},
    {path: 'supplier', component: SupplierComponent},
    {path: 'supply', component: SupplyComponent},
    {path: 'buyer', component: BuyerComponent},
    {path: 'fact', component: FactComponent},

  ]},

];
