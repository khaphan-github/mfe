import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { uniqueId } from 'lodash';

export type ICheckbox = {
  id: number;
  name: string;
  selected: boolean;  // Trạng thái của hộp kiểm (true hoặc false)
  disabled: boolean;
}

@Component({
  standalone: true,
  selector: 'app-check-box',
  template: `
    <div class="custom-control custom-checkbox pointer">
      <input type="checkbox" class="custom-control-input pointer"
        [id]="uniqueId" [checked]="cheched" (change)="toggleCheckbox()">
      <label class="custom-control-label pointer"  [for]="uniqueId">{{ label }}</label>
    </div>
  `,
  styles: [`
    .pointer {
      cursor: pointer
    }
  `]
})
export class AppCheckBoxComponent implements OnInit {
  @Input() label: string = '';
  @Input() cheched: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  uniqueId: string = '';

  constructor() { }

  ngOnInit(): void {
    this.uniqueId = 'app_checkbox_' + uniqueId();
  }

  toggleCheckbox() {
    this.cheched = !this.cheched;
    this.checkedChange.emit(this.cheched);
  }
}
