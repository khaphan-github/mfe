import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskComponent } from './input-mask.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InputMaskComponent],
  exports:[
    InputMaskComponent
  ]
})
export class InputMaskModule { }
