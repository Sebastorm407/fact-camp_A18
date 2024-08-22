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
    this.extraer()
  }

  extraer(){
    this.authService.getEmployee('1').subscribe((data: LoginEmployee) => {
      this.employee = data;
      console.log(data)
      console.log('Identification' + data.number_id);
    })
  }

  loginEmployee(){
    const employeeId = this.form.value.id;
    const passwordId = this.form.value.password;

    if(this.employee){
      if(employeeId === this.employee.number_id && passwordId === this.employee.password_id.toString()){
        this.router.navigate(['/dashboard'])
      }else{
        console.log('Eres un gil')
      }
    }
  }
}
