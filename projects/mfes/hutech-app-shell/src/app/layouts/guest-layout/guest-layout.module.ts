import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestLayoutComponent } from './guest-layout.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
import { GUEST_LAYOUT_ROUTES } from '../../guest-layout.routes';

@NgModule({
  declarations: [
    GuestLayoutComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule.forChild(GUEST_LAYOUT_ROUTES)
  ],
  providers: []
})
export class GuestLayoutModule { }
