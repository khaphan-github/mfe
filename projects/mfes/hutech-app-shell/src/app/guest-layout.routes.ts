import { Routes } from "@angular/router";
import { LoginComponent } from "@erp/projects/libs/frontend/angular/auth";
import { GuestLayoutComponent } from "./layouts/guest-layout/guest-layout.component";

export const GUEST_LAYOUT_ROUTES: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      }
    ]
  }
]
