import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TranslocoRootModule } from '@erp/angular/components';
import { ProductModule } from './modules/product/product.module';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    TranslocoRootModule,
    ProductModule,
    RouterModule,
  ],
  selector: 'erp-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'projects-apps-demo-product-main-web-angular';
}
