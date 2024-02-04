// loading-overlay.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
/*
exmaple:
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ProcessBarOverlayComponent, // <--- Import this one
  ],
  // ... //
})
export class YourComponent  {}

/// Copy this code to your html
<app-processbar-overlay
                       [showProcessBar]="true"
                       [progressValue]="1"
                       [total]="this.selectedItems.length">
    <h1> Put your component </h1>
</app-processbar-overlay>
*/
@Component({
  standalone: true,
  selector: 'app-processbar-overlay',
  imports: [
    CommonModule,
    TranslocoModule,
  ],
  template: `
 <div class="lock-loading-frame-wrap">
  @if(this.showProcessBar) {
    <div class="lock-loading-overlay" *transloco="let translated">
      <div class="col">
        <div class="h5 font-weight-bold ml-1">
          @if(this.enableLanguage) {
           <span> {{ translated(this.displayLabel) }}</span>
          } @else {
          <span>{{ this.displayLabel }}</span>
          }
        </div>
        <div class="progress progress-lg w-100">
          <div
            aria-label="ProcessBar"
            class="progress-bar"
            aria-valuemin="0"
            role="progressbar"
            [style.width.%]="(progressValue / total* 100)"
            [attr.aria-valuenow]="progressValue"
            [attr.aria-valuemax]="total"
          >
            <span style="color: white;">
            @if(this.enableLanguage) {
              {{ translated(this.processLabel) }}
              } @else {
                {{ this.processLabel }}
              }: {{ (progressValue / total* 100) | number: '1.0-0' }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  }
    <!-- Input your child component -->
    <ng-content></ng-content>
  </div>
  `,
  styleUrls: ['./processbar-overlay.component.css']
})
export class ProcessBarOverlayComponent {
  @Input() showProcessBar: boolean = false;
  @Input() progressValue: number = 0;
  @Input() total: number = 0;
  @Input() enableLanguage: boolean = false;
  @Input() displayLabel: string = 'Đang xử lý dữ liệu';
  @Input() processLabel: string = 'Tiến trình';
}
