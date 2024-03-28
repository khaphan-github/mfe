import { Routes } from '@angular/router';
import { MemLayoutComponent } from './layouts/mem-layout/mem-layout.component';
import { environment } from './config/environments/environment';
import { loadRemote } from './helpers/load-remote';
import { CanActivateAccessTokenGuard } from '@erp/projects/libs/frontend/angular/auth';

const { noiQuyLaoDong, demoProduct } = environment.microFeRemoteEntry;

export const MEMBERS_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    canActivateChild: [CanActivateAccessTokenGuard],
    component: MemLayoutComponent,
    children: [
      {
        path: 'nqld',
        loadComponent: () => loadRemote(noiQuyLaoDong, ''),
      },
      {
        // Khi chuyển route trên app shell đến route này thì mfe product sẽ được load.
        path: 'product',
        loadChildren: () => loadRemote(demoProduct, 'ProductModule'),
      },
      // Add other remote entry;
    ],
  },
];
