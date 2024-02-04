import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, take } from 'rxjs';
import Swal from "sweetalert2";

declare const toastr: any; // <-- Using toastr lib https://github.com/CodeSeven/toastr#other-options

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly TAKE_NUM_OF_VALUE_FROM_TRANSLATE_OBSERVABLE = 1;
  constructor(
    protected readonly translocoService: TranslocoService,
  ) {
    this.toastrConfig();
  }

  private toastrConfig = () => {
    toastr.options.timeOut = 3000; // miliseconds
    toastr.options.closeDuration = 100; // miliseconds
  }
  /**
   * Hiển thị thông báo cảnh báo trên giao diện.
   *
   * @param type Loại thông báo ('error' | 'info' | 'warning' | 'success').
   * @param title Tiêu đề của thông báo.
   * @param message Nội dung thông báo.
   * @param translated True nếu cần dịch nội dung thông báo.
   *
   * Usage:
   * constructor(private readonly notify: NotificationService) { }  <--- Inject service để xử dụng các phương thức bên trong.
   *
   * Ex: this.notify.showNotificationAlert('error', 'error.0.title', 'error.0.message', true);
   * error.0.title, error.0.message: là khóa của thông báo muốn thay đỗi ngôn ngữ (nằm trong file assets/i18n)
   *
   * Trường hợp chỉ muốn hiển thị thông báo - không cần đa ngôn ngữ:
   * this.notify.showNotificationAlert('error', 'Tiêu đề thông báo', 'Nội dung thông báo', false);
   */
  public showNotificationAlert = (
    type: 'error' | 'info' | 'warning' | 'success',
    title: string,
    message: string,
    translated?: boolean
  ) => {
    if (translated) {
      // NOTE: Waitting until i18n file (vi.json, ch.json...) loaded then alert! fixed ^^
      combineLatest([
        this.translocoService.selectTranslate(title),
        this.translocoService.selectTranslate(message),
      ])
        .pipe(take(this.TAKE_NUM_OF_VALUE_FROM_TRANSLATE_OBSERVABLE))
        .subscribe({
          next: ([_title, _message]) => {
            this.showToastByType(type, _title, _message);
          },
          error: (err) => {
            this.showToastByType(type, `Hiển thị tiêu đề thông báo`, `Mô tả chi tiết thông báo`);
          },
        });
    } else {
      this.showToastByType(type, title, message);
    }
  }

  private showToastByType(type: 'error' | 'info' | 'warning' | 'success', title: string, message: string,) {
    switch (type) {
      case 'error':
        toastr.error(message, title);
        break;
      case 'info':
        toastr.info(message, title);
        break;
      case 'warning':
        toastr.warning(message, title);
        break;
      default:
        toastr.success(message, title);
        break;
    }
  }

  /**
   * Hiển thị cửa sổ popup thông báo lỗi trên giao diện.
   *
   * @param title Tiêu đề của thông báo lỗi.
   * @param message Nội dung thông báo lỗi.
   * @param translated True nếu cần dịch nội dung thông báo.
   */
  public showErrorPopup(title: string, message: string, translated: boolean): void {
    if (translated) {
      title = this.translocoService.translate<string>(title);
      message = this.translocoService.translate<string>(message);
    }

    Swal.fire({
      position: 'top',
      customClass: {
        popup: 'bg-transparent shadow-none',
        closeButton: 'border-0 swal2-close',
      },
      html: `
        <div class="alert alert-danger alert-dismissible fade show d-flex align-items-center">
          <div class="alert-icon">
          <span class="icon-stack icon-stack-md">
              <i class="base-7 icon-stack-3x color-danger-900"></i>
              <i class="fal fa-times icon-stack-1x text-white"></i>
          </span>
          </div>
          <div class="flex-1">
          <span class="h4 text-left">${title}</span>
            <br>
            ${message}
          </div>
        </div>
      `,
      showConfirmButton: false,
      toast: true,
      width: 900,
      padding: 0,
      grow: 'column'
    })
  }
}
