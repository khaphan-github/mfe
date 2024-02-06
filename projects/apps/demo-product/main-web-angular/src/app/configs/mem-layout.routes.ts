import { Routes } from '@angular/router';
import { MemLayoutComponent } from '../layouts/mem-layout/mem-layout.component';

export const memLayoutRoutes: Routes = [
  {
    path: 'product',
    component: MemLayoutComponent,
    children: [
      {
        path: 'list',
        loadChildren: () =>
          import('../modules/product/product.module')
            .then(m => m.ProductModule),
      },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
      // Add other remote entry;
    ]
  },
];
