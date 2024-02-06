import { Routes } from '@angular/router';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';

export const APP_ROUTES: Routes = [
  /**
   * Thiết lập path và import các module phát triển trong tương lai vào
   */
  {
    path: '',
    loadChildren: () => import('./layouts/mem-layout/mem-layout.module')
      .then(m => m.MemLayoutModule),
  },
  {
    path: '',
    component: GuestLayoutComponent,
    loadChildren: () => import('./layouts/guest-layout/guest-layout.module')
      .then(m => m.GuestLayoutModule),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]
