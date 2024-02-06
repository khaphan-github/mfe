import { Routes } from '@angular/router';
import { ListComponent } from '../modules/category/list/list.component';

// Toàn bộ các thành phần của mfe sẽ được điều hướng thông qua route này.
// Ứng với left menu
export const MFE_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../modules/product/product.module')
        .then(m => m.ProductModule),
  },
  { path: '**', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'category',
    component: ListComponent,
  },
]
