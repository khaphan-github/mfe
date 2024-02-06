import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren:
      () => import('./layouts/mem-layout/mem-layout.module')
        .then(m => m.MemLayoutModule),
  },
];
