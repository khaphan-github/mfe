import * as _ from "lodash";

export type DuplicateEntry = {
  key: string;
  values: string[];
}

export class KeyStorageHelper {
  /**
     * Hàm giúp phẳng đối tượng đệ quy thành đối tượng phẳng.
     * @param {any} obj - Đối tượng cần phẳng.
     * @param {string} [path=''] - Đường dẫn thực hiện phẳng đối tượng.
     * @returns {any} Đối tượng đã phẳng.
     * @private
     */
  private flattenObject(obj: any, path: string = ''): any {
    const formatted: any = {};
    _.forOwn(obj, (value, key) => {
      const newPath = path ? `${path}.${key}` : key;
      if (_.isObject(value)) {
        _.merge(formatted, this.flattenObject(value, newPath));
      } else {
        formatted[newPath] = value;
      }
    });

    return formatted;
  }

  /**
   * Tìm các giá trị trùng lặp trong đối tượng dữ liệu.
   * @param {Record<string, string>} data - Đối tượng dữ liệu cần kiểm tra.
   * @throws {Error} Nếu phát hiện giá trị trùng lặp.
   * @private
   */
  private findDuplicateValues(data: Record<string, string>): DuplicateEntry[] {
    const inverted = _.invertBy(data);
    const duplicates: DuplicateEntry[] = [];

    _.forEach(inverted, (values, key) => {
      if (values.length > 1) {
        duplicates.push({ key, values });
      }
    });
    return duplicates;
  }

  /**
   * Tìm các đối tượng dữ liệu có giá trị trùng lặp.
   * @param {any} configKeys - Đối tượng dữ liệu cần kiểm tra.
   * @returns {any} Đối tượng chứa thông tin về giá trị trùng lặp.
   */
  findDuplicateObjects(configKeys: any): DuplicateEntry[] {
    const flattenedObject = this.flattenObject(configKeys);
    return this.findDuplicateValues(flattenedObject);
  }

  verifyStorageKey = (keys: object) => {
    const keyStorageHelper = new KeyStorageHelper();
    // Verify local storage keys
    const duplicatedLocalStorageKey =
      keyStorageHelper.findDuplicateObjects(keys);
    if (duplicatedLocalStorageKey.length > 0) {
      this.throwErrorWhenDuplicatedKey(duplicatedLocalStorageKey);
    }
  }

  throwErrorWhenDuplicatedKey = (duplicateValue: DuplicateEntry[]) => {
    _.forEach(duplicateValue, (value: { key: any; values: any; }) => {
      throw new Error(`Lỗi trùng giá trị ${value.key} trong các khóa ${value.values}`);
    })
  }
}

