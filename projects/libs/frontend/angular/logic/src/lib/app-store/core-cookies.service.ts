import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CoreCookiesService {

  /**
   * Lưu một cookie với tên, giá trị và thời gian sống (tính theo giây).
   * @param name Tên của cookie.
   * @param value Giá trị của cookie.
   * @param expireInSeconds Thời gian sống của cookie (tính theo giây).
   */
  setCookie(name: string, value: string, expireInSeconds?: number): void {
    const expirationDate = new Date();
    if (expireInSeconds) {
      expirationDate.setSeconds(expirationDate.getSeconds() + expireInSeconds);
    } else {
      expirationDate.setSeconds(expirationDate.getSeconds() + 3600);
    }

    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
  }

  /**
   * Lấy giá trị của một cookie dựa trên tên.
   * @param name Tên của cookie.
   * @returns Giá trị của cookie hoặc null nếu không tìm thấy.
   */
  getCookie(name: string): string | null {
    const cookieValue = RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`).exec(document.cookie);
    return cookieValue ? decodeURIComponent(cookieValue.pop() ?? '') : null;
  }

  /**
   * Xóa một cookie dựa trên tên.
   * @param name Tên của cookie cần xóa.
   */
  deleteCookies(names: string[]): void {
    _.forEach(names, (name) => {
      this.setCookie(name, '', -1);
    });
  }
}
