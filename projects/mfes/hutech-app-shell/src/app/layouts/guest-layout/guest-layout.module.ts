import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestLayoutComponent } from './guest-layout.component';
import { GuestRoutingModule } from './guest-layout.routing.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    GuestLayoutComponent
  ],
  imports: [
    CommonModule,
    TranslocoModule,
    GuestRoutingModule,
  ],
  providers: [
  ]
})
export class GuestLayoutModule { }
