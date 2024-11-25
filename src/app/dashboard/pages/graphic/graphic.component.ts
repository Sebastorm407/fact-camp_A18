import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormService } from '../product/services/form.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FilterProductsPipe } from '../product/filter/filter-products.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmployesService } from './services/employes.service';
import { CityService } from './services/cities.service';
import { GenderService } from './services/gender.service';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, HttpClientModule, CommonModule, FormsModule, FilterProductsPipe, NgxPaginationModule],
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
    isOpenEmployees: boolean = false;
    formEmployee: FormGroup;

    //Productos
    createdProduct: any = null;
    employeeId: number | null = null;
    products: {id: number, name: string, sell_price: number}[] = [];
    employees: any[] = []
    cities: any[] = []
    genders: any[] = []


    constructor(
      private fb: FormBuilder,
      private formService: FormService,
      private employeeService: EmployesService,
      private cityService: CityService,
      private genderService: GenderService
    ){
      this.formEmployee = this.fb.group({
        number_id: ['', Validators.required],
        name: ['', Validators.required],
        last_name: ['', Validators.required],
        birthdate: ['2024-01-01', Validators.required],
        address: ['', Validators.required],
        phone_number: ['', Validators.required],
        id_city: ['', Validators.required],
        id_gender: ['', Validators.required],
        password_id: ['123456789', Validators.required]
      });
    }

    ngOnInit(): void {
        console.log(this.getEmployee());
        console.log(this.getCities());
        console.log(this.getGender());
    }

    //SECCION EMPLEADOS ----------------------------------------

    getGender(): void {
      this.genderService.getGender().subscribe({
        next: (data) => {
          console.log('Gender', data)
          this.genders = data.map((gender: any, index: any) => ({
            ...gender,
            index: index + 1
          }));
        },
        error: (err) => {
          console.error('Error al obtener los generos');
        }
      })
    }

    getCities(): void {
      this.cityService.getCities().subscribe({
        next: (data) => {
          console.log('Cities', data)
          this.cities = data.map((city: any, index: any) => ({
            ...city,
            index: index + 1
          }));
        },
        error: (err) => {
          console.error('Error al obtener las ciudades')
        }
      })
    }

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

    createEmployee(){
      if(this.formEmployee.valid){
        const employee = this.formEmployee.value;
        console.log(employee)
        this.employeeService.createEmployee(employee).subscribe({
          next: () => {
            console.log('Empleado agregado exitosamente');
            this.formEmployee.reset();
          },
          error: (err: any) => {
            console.error('Error al agregar el empleado', err)
          }
        })
      }
      this.closeEmployee();
    }

    //FIN SECCION MODALES Y DEMAS -------------------------------------------

    openAddEmployee(){
      this.isOpenEmployees = true;
    }

    closeEmployee(){
      this.isOpenEmployees = false
      document.body.style.overflow = '';
    }
}
