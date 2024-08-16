import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css'
})
export class GraphicComponent {

}
