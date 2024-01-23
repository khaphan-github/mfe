import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'erp-nx-welcome-remote',
  standalone: true,
  imports: [CommonModule],
  template: `
  <h1>HI </h1>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent { }
