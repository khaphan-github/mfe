import { Routes } from '@angular/router';
import { MemLayoutComponent } from '../layouts/mem-layout/mem-layout.component';

export const memLayoutRoutes: Routes = [
  {
    path: '',
    component: MemLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../modules/product/product.module')
            .then(m => m.ProductModule),
      },
      // Add other remote entry;
    ]
  },
];
