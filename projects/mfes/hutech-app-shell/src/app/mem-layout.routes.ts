import { Routes } from '@angular/router';
import { MemLayoutComponent } from './layouts/mem-layout/mem-layout.component';
import { environment } from './config/environments/environment';
import { loadRemote } from './helpers/load-remote';

export const memLayoutRoutes: Routes = [
  {
    path: '',
    component: MemLayoutComponent,
    children: [
      {
        path: 'nqld',
        loadComponent: () => loadRemote(environment.microFeRemoteEntry.noiQuyLaoDong, ''),
      },
      {
        // Khi chuyển route trên app shell đến route này thì mfe product sẽ được load.
        path: 'product',
        loadChildren: () => loadRemote(environment.microFeRemoteEntry.demoProduct, 'ProductModule'),
      }
      // Add other remote entry;
    ]
  },
];
