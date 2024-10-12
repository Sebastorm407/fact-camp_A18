import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginEmployee } from '../models/employee/employee';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  number_id: string = '';
  password: string = '';
  addedEmployees: any[] = [];
  employeeAd: any[] = [];
  employees: any[] = [];

  employee?: LoginEmployee;
  employeeObject: string[] = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ){
    this.form = this.fb.group({
      id: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  /*
  login(): void{
    this.authService.login(this.number_id, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => console.error('Login failed', err)
    })
  }
    */

  extraer(){
    /*
    this.authService.getEmployeeById(id).subscribe((data: LoginEmployee) => {
      this.employee = data;
      console.log(data)
      console.log('Identification' + data.number_id);
    })
    */
  }

  /*
  makeBill(){
    this.addedProducts.forEach(product => {
      const productTotal = product.sell_price * product.quantity;
      this.totalBill += productTotal;

      this.makeBillProduct.push(product)
    })
    this.getEmployee();
  }
*/

/*
  getEmployees(): void{
    this.authService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        console.log(this.employees)

        //Recorrer y meter en array
        this.employees.forEach(employee => {
          this.employeeAd.push(employee);
        })
        console.log(this.employeeAd);
      },
      error: (err) => {
        console.error('Error al obtener los empleados', err)
      }
    })
  }
    */

  /*
  loginEmployee(){
    this.getEmployees();

    const foundEmployee = this.employees.find(employeeArray =>
      employeeArray.number_id === this.number_id && employeeArray.password === this.password
    );

    if(foundEmployee){
      console.log('Empleado encontrado', foundEmployee);
      const token = this.authService.generateToken(foundEmployee.id)
      localStorage.setItem('token', token);
      this.router.navigate(['/dashboard']);
    } else{
      console.error('Credenciales incorrectas');
    }
  */
    /*
    const employeeId = this.form.value.id;
    const passwordId = this.form.value.password;

    if(this.employee){
      if(employeeId === this.employee.number_id && passwordId === this.employee.password_id.toString()){
        this.router.navigate(['/dashboard'])
      }else{
        console.log('Eres un gil')
      }
    }
    */
  }
