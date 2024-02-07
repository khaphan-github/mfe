import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
  {
    // Layout sau khi đã đăng nhập vào ứng dụng
    path: '',
    loadChildren:
      () => import('./layouts/mem-layout/mem-layout.module')
        .then(m => m.MemLayoutModule),
  },
  {
    // Layout bên ngoài ứng dụng: Đăng nhập - đăng ký - quên mật khẩu.
    path: '',
    loadChildren:
      () => import('./layouts/guest-layout/guest-layout.module')
        .then(m => m.GuestLayoutModule),
  },
];
