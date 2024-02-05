import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CoreSessionStorageService {
  /**
   * Lưu một giá trị vào Session Storage với khóa cho trước.
   * @param key Khóa để lưu trữ giá trị.
   * @param value Giá trị cần lưu trữ.
   */
  setItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Lấy giá trị từ Session Storage dựa trên khóa.
   * @param key Khóa để tìm giá trị.
   * @returns Giá trị tương ứng với khóa hoặc `null` nếu không tìm thấy.
   */
  getItem<T>(key: string): T | null {
    const storedValue = sessionStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }

  /**
   * Xóa một giá trị khỏi Session Storage dựa trên khóa.
   * @param key Khóa của giá trị cần xóa.
   */
  removeItems(keys: string[]): void {
    _.forEach(keys, (key: string) => {
      sessionStorage.removeItem(key);
    });
  }

  /**
   * Xóa tất cả các giá trị trong Session Storage.
   */
  clear(): void {
    sessionStorage.clear();
  }
}
