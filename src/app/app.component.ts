import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DashboardComponent, RouterLink, LoginComponent, HttpClientModule, ReactiveFormsModule, FormsModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'factcamp18';
}
