import { Directive, ElementRef, Inject, Input, OnInit, isDevMode } from "@angular/core";
import { DecentralizeModel } from "./decentralization.model";
import { DecentralierService } from "./decentralization.services";

/**
 * Directive này cho phép kiểm tra và ẩn các phần tử DOM dựa trên khóa hành động được cung cấp.
 * Nếu hành động không được ủy quyền cho người dùng, phần tử DOM sẽ bị ẩn.
 */
@Directive({
  selector: '[authenAction]',
})
export class DecentralizeDirective implements OnInit {
  /**
   * Khóa hành động cần kiểm tra ủy quyền:
   * Sử dụng:
   * <div [authenAciton]="'path.of.key.to.action'"> Hello </div>
   */
  @Input('authenAction') actionKey: string = '';


  /**
   * @param elementRef - Tham chiếu tới phần tử DOM được liên kết với directive.
   * @param decentralizerService - Thể hiện của DecentralierService để truy xuất các yếu tố hoạt động hiện tại.
   */
  constructor(
    private readonly elementRef: ElementRef,
    private readonly decentralizerService: DecentralierService,
  ) { }

  /**
   * Lifecycle hook: ngOnInit.
   * Kiểm tra khóa hành động và ẩn phần tử DOM nếu không được ủy quyền.
   * Nếu không có khóa hành động nào được cung cấp, sẽ gây ra lỗi và ngừng việc khởi tạo.
   */

  ngOnInit() {
    if (this.actionKey.length === 0) {
      throw new Error(`When declare directive [authenAction] with empty key`);
    }

    const decentralizeModel =
      new DecentralizeModel(this.actionKey, this.getActiveActionsByUser());

    if (!decentralizeModel.isActive()) {
      this.elementRef.nativeElement.remove();
    }
  }


  /**
   * Lấy các actionIds của người dùng từ DecentralierService.
   *
   * @returns Mảng chứa các actionIds của người dùng.
   */
  private getActiveActionsByUser = () => {
    return this.decentralizerService.getActiveElement();
  }
}
