import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fact',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './fact.component.html',
  styleUrl: './fact.component.css'
})
export class FactComponent {

}
