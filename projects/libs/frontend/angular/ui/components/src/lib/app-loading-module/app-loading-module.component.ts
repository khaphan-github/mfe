import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'erp-app-loading-module',
  templateUrl: './app-loading-module.component.html',
  styleUrls: ['./app-loading-module.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(300)),
    ])
  ]
})
export class AppLoadingModuleComponent {
  @Input() isLoading: boolean = false;
}
