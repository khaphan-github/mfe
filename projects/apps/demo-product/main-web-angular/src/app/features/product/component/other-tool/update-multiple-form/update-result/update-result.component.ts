import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-update-result',
  templateUrl: './update-result.component.html',
  styleUrls: ['./update-result.component.css']
})
export class UpdateResultComponent {
  @Input() successRecords: Array<any> = [];
  @Input() errorRecords: Array<any> = [];
  @Input() totalRecords: Array<any> = [];
}
