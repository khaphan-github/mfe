import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NotFoundDataComponent } from '@erp/angular/components';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NotFoundDataComponent,
  ],
  selector: 'app-display-selected-item',
  templateUrl: './display-selected-item.component.html',
  styleUrls: ['./display-selected-item.component.css']
})
export class DisplaySelectedItemComponent {
  @Input() selectedItems: Array<any> = []; // Change ant to MODEL class
  @Input() visibleCount: number = 2;

  currentVisibleCount = this.visibleCount;

  showMoreSelected() {
    this.currentVisibleCount += 2;
  }

  hideMoreSelected() {
    if (this.currentVisibleCount >= this.visibleCount) {
      this.currentVisibleCount -= 2;
    }
  }
}
