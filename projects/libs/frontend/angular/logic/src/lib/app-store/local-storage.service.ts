import { Injectable } from '@angular/core';
import * as _ from 'lodash';
/**
 * Service quản lý lưu trữ dữ liệu cốt lõi.
 */
@Injectable({ providedIn: 'root' })
export class CoreLocalStorageService {

  /**
   * Lấy giá trị dữ liệu từ Local Storage dựa trên khóa.
   * @template T
   * @param {string} key - Khóa dữ liệu cần lấy.
   * @returns {T} Giá trị dữ liệu tương ứng.
   */
  getItem<T>(key: string): T | any {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return undefined;
  }

  /**
   * Đặt giá trị dữ liệu vào Local Storage dựa trên khóa và giá trị.
   * @param {string} key - Khóa dữ liệu cần đặt.
   * @param {any} value - Giá trị dữ liệu cần đặt.
   */
  setItem(key: string, value: any) {
    localStorage.setItem(key, value ? JSON.stringify(value) : '');
  }

  /**
   * Xóa các giá trị dữ liệu từ Local Storage dựa trên danh sách khóa.
   * @param {string[]} keys - Danh sách các khóa cần xóa.
   */
  removeItems(keys: string[]) {
    _.forEach(keys, (key: string) => {
      localStorage.removeItem(key)
    })
  }

  /**
   * Xóa tất cả dữ liệu trong Local Storage.
   */
  clear() {
    localStorage.clear();
  }
}
