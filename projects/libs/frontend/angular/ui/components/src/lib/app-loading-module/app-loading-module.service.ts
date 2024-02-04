import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLoadingModuleService {
  isLoading: boolean = false;

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}
