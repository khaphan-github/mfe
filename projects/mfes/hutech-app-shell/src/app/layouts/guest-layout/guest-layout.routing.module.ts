import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const guestRoutes: Routes = []

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(guestRoutes),
  ],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
