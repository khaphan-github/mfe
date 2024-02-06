import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabSettingService {

  public storageChangeThemeMode = new Subject<string>();

  constructor() {}

  public getStorageChangeThemeMode(): Observable<string>{
    return this.storageChangeThemeMode.asObservable()
  }

}
