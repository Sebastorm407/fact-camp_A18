import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-supply',
  standalone: true,
  imports: [RouterLink, RouterOutlet, HttpClientModule],
  templateUrl: './supply.component.html',
  styleUrl: './supply.component.css'
})
export class SupplyComponent {

}
