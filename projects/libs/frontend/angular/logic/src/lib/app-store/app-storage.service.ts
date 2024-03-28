import { Injectable, inject } from '@angular/core';
import { CoreLocalStorageService } from './local-storage.service';
import { CoreCookiesService } from './core-cookies.service';
import { CoreSessionStorageService } from './core-session-storage.service';

export type Options = {
  location: 'LOCAL_STORAGE' | 'SESSION_STORAGE' | 'COOKIES';
  expireInSeconds?: number;
};

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  private readonly localStorage = inject(CoreLocalStorageService);
  private readonly sessionStorage = inject(CoreSessionStorageService);
  private readonly cookie = inject(CoreCookiesService);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public setItem(key: string, value: any, options: Options) {
    switch (options.location) {
      case 'LOCAL_STORAGE':
        this.localStorage.setItem(key, value);
        break;
      case 'SESSION_STORAGE':
        this.sessionStorage.setItem(key, value);
        break;
      case 'COOKIES':
        this.cookie.setCookie(key, value, options.expireInSeconds);
        break;
      default:
        break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getItem<T>(key: string, options: Options): T | any {
    switch (options.location) {
      case 'LOCAL_STORAGE':
        return this.localStorage.getItem<T>(key);
      case 'SESSION_STORAGE':
        return this.sessionStorage.getItem<T>(key);
      case 'COOKIES':
        return this.cookie.getCookie(key);
      default:
        break;
    }
  }

  public removeItems(key: string[], options: Options) {
    switch (options.location) {
      case 'LOCAL_STORAGE':
        this.localStorage.removeItems(key);
        break;
      case 'SESSION_STORAGE':
        this.sessionStorage.removeItems(key);
        break;
      case 'COOKIES':
        this.cookie.deleteCookies(key);
        break;
      default:
        break;
    }
  }

  public removeAllIn(options: Options) {
    switch (options.location) {
      case 'LOCAL_STORAGE':
        this.localStorage.clear();
        break;
      case 'SESSION_STORAGE':
        this.sessionStorage.clear();
        break;
      case 'COOKIES':
        throw new Error(`Method not allowed`);
      default:
        break;
    }
  }
}
