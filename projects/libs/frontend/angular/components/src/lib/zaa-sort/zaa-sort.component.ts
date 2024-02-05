import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';

export interface SortOptions {
  id: string;
  displayText: string;
  icon?: string;
  metadata?: any;
}
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    TranslocoModule,
  ],
  selector: 'app-zaa-sort',
  templateUrl: './zaa-sort.component.html',
  styleUrls: ['./zaa-sort.component.css']
})
export class ZaaSortComponent {
  @Input() options: Array<SortOptions> = [];
  @Input() currentOptionsId!: Array<SortOptions>;
  @Input() allowMany: boolean = false;
  @Input() enableLanguage: boolean = false;

  @Output() choose = new EventEmitter<Array<SortOptions>>();

  onChoose(option: SortOptions) {
    if (this.allowMany) {
      const selectedOptions = Array.isArray(this.currentOptionsId) ? this.currentOptionsId : [];

      const index = selectedOptions.findIndex((o) => o.id === option.id);

      if (index !== -1) {
        selectedOptions.splice(index, 1);
      } else {
        selectedOptions.push(option);
      }
      this.currentOptionsId = selectedOptions;
      this.choose.emit(selectedOptions);
    } else {
      this.currentOptionsId = [option];
      this.choose.emit([option]);
    }
  }

  isActive(option: SortOptions) {
    const selectedOptions = Array.isArray(this.currentOptionsId) ? this.currentOptionsId : [];
    return selectedOptions.some((o) => o.id === option.id);
  }
}
