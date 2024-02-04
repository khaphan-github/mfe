import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslocoModule } from '@ngneat/transloco';

export interface SortOptions {
  id: string;
  displayText: string;
  language?: boolean
  icon?: string;
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
  @Input() currentOptionsId: string = '';
  @Output() choose = new EventEmitter<SortOptions>();
}
