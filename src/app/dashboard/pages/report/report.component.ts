import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {

}
