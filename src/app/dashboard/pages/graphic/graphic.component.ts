import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { FormService } from '../product/services/form.service';
import { CreateProductService } from '../product/add-product/services/create-product.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterProductsPipe } from '../product/filter/filter-products.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployesService } from './services/employes.service';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule, FormsModule, FilterProductsPipe, NgxPaginationModule],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css'
})
export class GraphicComponent implements OnInit {

    //Paginacion y Filter
    p: number = 1;
    pageSize: number = 10;
    searchText: string = '';

    //Modal
    isOpenModal: boolean = false;

    //Productos
    createdProduct: any = null;
    employeeId: number | null = null;
    products: {id: number, name: string, sell_price: number}[] = [];
    employees: any[] = []

    constructor(
      private formService: FormService,
      private createProductService: CreateProductService,
      private employeeService: EmployesService
    ){}

    ngOnInit(): void {
        this.formService.products$.subscribe(products => {
          this.products = products
        })
        console.log(this.getEmployee());
    }

    //SECCION EMPLEADOS ----------------------------------------

    getEmployee(): void{
      this.employeeService.getEmployees().subscribe({
        next: (data) => {
          console.log('Empleados', data)
          this.employees = data.map((employee: any, index: any) => ({
            ...employee,
            index: index + 1
          }));
        },
        error: (err) => {
          console.error('Error al obtener los empleados');
        }
      })
    }

    deleteEmployeeById(employeeId: number): void {
      if(employeeId){
        this.employeeService.deleteEmployeeById(employeeId).subscribe(
          () => {
            console.log('Empleado eliminado exitosamente');
            this.employees = this.employees.filter(employee => employee.id !== employeeId);
          },
          (error) => {
            console.error('Error al eliminar el empleado', error);
          }
        )
      }
    }

    //FIN SECCION PRODUCTOS ----------------------------------------

    //SECCION MODALES Y DEMAS -------------------------------------------

    get totalPages(): number {
      return Math.ceil(this.products.length / this.pageSize);
    }

    openModal(employeeId: number){
      this.isOpenModal = true
      this.employeeId = employeeId
      document.body.style.overflow = 'hidden';
    }

    closeModal(){
      this.isOpenModal = false
      document.body.style.overflow = '';
    }

    accept(){
      if (this.employeeId !== null) {
        this.deleteEmployeeById(this.employeeId);
        this.closeModal();
      } else {
        console.error('El ID del empleado es nulo');
      }
    }

    formatTotal(value: number): string {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    //FIN SECCION MODALES Y DEMAS -------------------------------------------
}
