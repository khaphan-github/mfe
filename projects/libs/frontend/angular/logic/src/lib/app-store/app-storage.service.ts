import { Injectable } from '@angular/core';
import { CoreLocalStorageService } from './local-storage.service';
import { CoreCookiesService } from './core-cookies.service';
import { CoreSessionStorageService } from './core-session-storage.service';

export enum StorageLocation {
  LOCAL_STORAGE = 'LOCAL_STORAGE',
  SESSION_STORAGE = 'SESSION_STORAGE',
  COOKIES = 'COOKIES',
}

type Options = {
  location: StorageLocation;
  expireInSeconds?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {
  constructor(
    private readonly localStorage: CoreLocalStorageService,
    private readonly sessionStorage: CoreSessionStorageService,
    private readonly cookie: CoreCookiesService,

  ) { }

  public setItem(key: string, value: any, options: Options) {
    switch (options.location) {
      case StorageLocation.LOCAL_STORAGE:
        this.localStorage.setItem(key, value);
        break;
      case StorageLocation.SESSION_STORAGE:
        this.sessionStorage.setItem(key, value);
        break;
      case StorageLocation.COOKIES:
        this.cookie.setCookie(key, value, options.expireInSeconds);
        break;
      default:
        break;
    }
  }

  public getItem<T>(key: string, options: Options): T | any {
    switch (options.location) {
      case StorageLocation.LOCAL_STORAGE:
        return this.localStorage.getItem<T>(key);
      case StorageLocation.SESSION_STORAGE:
        return this.sessionStorage.getItem<T>(key);
      case StorageLocation.COOKIES:
        return this.cookie.getCookie(key);
      default:
        break;
    }
  }

  public removeItems(key: string[], options: Options) {
    switch (options.location) {
      case StorageLocation.LOCAL_STORAGE:
        this.localStorage.removeItems(key);
        break;
      case StorageLocation.SESSION_STORAGE:
        this.sessionStorage.removeItems(key);
        break;
      case StorageLocation.COOKIES:
        this.cookie.deleteCookies(key);
        break;
      default:
        break;
    }
  }

  public removeAllIn(options: Options) {
    switch (options.location) {
      case StorageLocation.LOCAL_STORAGE:
        this.localStorage.clear();
        break;
      case StorageLocation.SESSION_STORAGE:
        this.sessionStorage.clear();
        break;
      case StorageLocation.COOKIES:
        throw new Error(`Method not allowed`);
      default:
        break;
    }
  }


}
