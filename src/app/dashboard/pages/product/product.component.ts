import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
