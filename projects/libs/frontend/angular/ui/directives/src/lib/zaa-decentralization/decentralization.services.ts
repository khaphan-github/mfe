import { Injectable } from "@angular/core";
import { LocalStorageConfigKeys } from "src/app/config/app-storage/local-storage.config";
import { AppStorageService, StorageLocation } from "src/app/core/app-store/app-storage.service";
import { CoreSharedState } from "src/app/core/state/core-shared.state";

/**
 * Luồng xử lý:
 * - Sau khi thực hiện đăng nhập - server sẽ trả về thông tin người dùng
 *   trong số đó có thông tin "actionIds": [123, 124]
 * - setElements([]) để đưa thông tin actionIds vào state.
 *
 * Mục đích:
 * Vì thông tin này được xử dụng rất nhiều lần khi người dùng sử dụng ứng dụng,
 * Việc đọc dữ liệu từ localstorage lâu hơn việc đọc dữ liệu từ state.
 * Nên dùng service "DecentralierService" để lưu dữ liệu.
 *
 * NOTE: Chỉ được phép xử dụng ở nội bộ DecentralierModule.
 */

@Injectable({ providedIn: 'root' })
export class DecentralierService extends CoreSharedState<any[]>{
  private readonly localStorageScope = LocalStorageConfigKeys.feature.auth;
  constructor(
    private readonly storage: AppStorageService,
  ) {
    super([]);
  }

  /**
  * Thiết lập danh sách các yếu tố hoạt động (actions) hoạt động.
  *
  * @param elements - Mảng chứa các yếu tố hoạt động (actions) hoạt động cần thiết để ủy quyền.
  */
  public setElements = (elements: any[]) => {
    this.setState(elements);
    this.pushStateToSubscriber();
  }

  /**
   * Lấy danh sách các yếu tố hoạt động (actions) hoạt động từ bộ nhớ và lưu trữ trình duyệt.
   * Nếu không có yếu tố hoạt động nào được lưu trữ, trả về một mảng rỗng.
   *
   * @returns Mảng chứa các yếu tố hoạt động (actions) hoạt động.
   */
  public getActiveElement = () => {
    if (this.getCurrentValue()?.length === 0) {

      const activeIdsInStorage = this.storage.getItem<number[]>(
        this.localStorageScope.actionIds,
        { location: StorageLocation.LOCAL_STORAGE }
      );

      if (!activeIdsInStorage) {
        return [];
      }

      this.setElements(activeIdsInStorage);
      return activeIdsInStorage;
    }

    return this.getCurrentValue();
  }
}
