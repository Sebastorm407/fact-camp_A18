import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { LoginEmployee } from '../models/employee/employee';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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

  constructor(){

  }

  ngOnInit(): void {

  }

  loginEmployee(){
    /*
    const id = this.form.value.id;
    const password = this.form.value.password;

    console.log(id)
    console.log(password)

    if(id == '123' && password == 'admin'){
        this.router.navigate(['/dashboard'])
    }else{
      console.log('Eres un gil')
    }
    */
  }
}
