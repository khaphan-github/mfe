import { isDevMode } from "@angular/core";
import _ from "lodash";
import { GlobalPolcies } from "src/app/config/policy/policy.config";

/**
 * Lớp DecentralizeModel đại diện cho mô hình kiểm tra ủy quyền dựa trên
 * khóa hành động và các yếu tố hoạt động.
 */
export class DecentralizeModel {
  /**
  * Danh sách các chính sách toàn cục.
  * Chú ý: Cần thiết khai báo và cung cấp GlobalPolcies từ nguồn dữ liệu bên ngoài.
  */
  private readonly globalPolcies = GlobalPolcies || [];

  /**
   *
   * @param keyPath - Đường dẫn khóa hành động cần kiểm tra.
   * @param activeElements - Mảng chứa các yếu tố hoạt động (action) của người dùng.
   */
  constructor(
    private readonly keyPath: string,
    private readonly activeElements: string[] | any[]
  ) { }

  /**
   * Lấy giá trị từ một đối tượng bằng đường dẫn khóa (key path).
   *
   * @param obj - Đối tượng cần truy xuất.
   * @param keyPath - Đường dẫn khóa (key path) cần lấy giá trị.
   * @returns Giá trị được truy xuất từ đối tượng bằng đường dẫn khóa (key path).
   */
  private getValueByKey = (obj: any, keyPath: string) => {
    const keys = keyPath.split('.');
    let result = obj;

    for (const key of keys) {
      if (result.hasOwnProperty(key)) {
        result = result[key];
      } else {
        return undefined;
      }
    }
    return result;
  }

  /**
   * Kiểm tra xem khóa hành động có được ủy quyền hay không dựa trên các actionIds của người dùng.
   *
   * @returns Giá trị true nếu khóa hành động (action) được ủy quyền, ngược lại là false.
   */
  public isActive = (): boolean => {

    if (!this.activeElements || this.activeElements.length === 0) {
      return false;
    }
    const elementByInputKey = this.getValueByKey(this.globalPolcies, this.keyPath);

    return _.includes(this.activeElements, elementByInputKey);
  }
}
