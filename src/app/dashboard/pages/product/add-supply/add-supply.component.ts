import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-supply',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './add-supply.component.html',
  styleUrl: './add-supply.component.css'
})
export class AddSupplyComponent {

}
