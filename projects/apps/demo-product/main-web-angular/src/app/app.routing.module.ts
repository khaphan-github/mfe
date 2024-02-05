import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';

const routes: Routes = [
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

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        // preloadingStrategy: PreloadAllModules,//Tự động load toàn bộ các module khác khi run xong các phần chính
        // useHash: true,

        // Mỗi khi routing thì sẽ auto scroll lên top
        // scrollPositionRestoration: 'enabled',

        // Hiển thị trang khi chuyển mượt mà :)
        enableViewTransitions: true,
      },
    )
  ],
  providers: [
    // {
    //   provide: LocationStrategy,
    //   useClass: HashLocationStrategy
    // },
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
