import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-buyer',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './buyer.component.html',
  styleUrl: './buyer.component.css'
})
export class BuyerComponent {

}
