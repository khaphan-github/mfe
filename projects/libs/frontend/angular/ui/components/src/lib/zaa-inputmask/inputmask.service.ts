import { Injectable } from '@angular/core';

import  { initInputMask } from "inputMask";
@Injectable({
  providedIn: 'root',
})
export class InputMaskService {
  constructor() {
    // Kích hoạt js cho input mask
    initInputMask();
  }
  activeJsInputMask(element: any) {
    element.inputmask();
  }
}
