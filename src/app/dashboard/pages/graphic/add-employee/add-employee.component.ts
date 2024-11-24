import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [],
  template: `<p>add-client works!</p>`,
  styleUrl: './add-employee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent { }
