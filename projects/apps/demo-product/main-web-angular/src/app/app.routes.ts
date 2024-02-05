import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'product',
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => m.ProductModule)
  }
];
