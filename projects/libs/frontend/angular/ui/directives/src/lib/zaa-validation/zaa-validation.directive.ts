import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { NotificationService } from '@shared/components/zaa-notication/notification.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[zaaValidation]'
})
export class ZaaValidationDirective implements OnInit, AfterViewInit, OnDestroy {

  private subscription = new Subscription();

  private isDOMCompeletd: boolean = false;
  private elementValid: any;
  private elementInValid: any;
  private elementControl: any;

  // errors or success
  private readonly PATH_KEY_TRANSLATE = 'shared.components.customValidators.';

  constructor(
    private readonly el: ElementRef,
    private readonly toast: NotificationService,
    private readonly ngControl: NgControl,
    private readonly translocoService: TranslocoService,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    // DOM chưa xong
    this.isDOMCompeletd = false;
    if (!this.ngControl) return;

    /**
     // TODO: Tạm thời dùng statusChange để update mỗi khi thay đổi
     * Lý do: nếu dùng valueChanges -> bên components có gọi api truyền vào mà
     1. trả về error trễ
     2. dùng setErrors
     3 ...
     thì nó không trigger lại
     */
    // this.subscription.add(this.ngControl.valueChanges?.subscribe(() => {
    //   this.updateValidationMessage(this.elementControl);
    // }))
    this.subscription.add(this.ngControl.statusChanges?.subscribe(() => {
      this.updateValidationMessage(this.elementControl);
    }))

    /**
     * Chờ 1 trong 2 language đã được chạy xong thì update lại validate
     */
    // this.translocoService.selectTranslate(this.PATH_KEY_TRANSLATE + 'success').subscribe(() => {
    //   this.updateValidationMessage(this.elementControl);
    // })
    this.subscription.add(this.translocoService.selectTranslate(this.PATH_KEY_TRANSLATE + 'errors').subscribe(() => {
      this.updateValidationMessage(this.elementControl);
    }))
  }

  /**
   @description Trước khi xử lý VALIDATE:
   * 1. Thêm các element có class chứa UI lỗi và không lỗi vào.
   * <div class="valid-feedback"></div>
   * <div class="invalid-feedback"></div>
   * 2. Thêm các formControlName vào mỗi control
   */
  ngAfterViewInit(): void {

    // DOM đã xong
    this.isDOMCompeletd = true;

    const nativeElement = this.el.nativeElement;

    // tim thẻ đang dùng
    const tagElement = nativeElement.tagName?.toLowerCase();
    const typeElement = nativeElement.type?.toLowerCase();
    let position = "after";

    // xử lú UI từng thẻ
    switch (tagElement) {
      case "text-area":
      case "select":
      case "date-picker-single":
      case "date-picker-range":
        this.elementControl = nativeElement;
        break;
      case "input":
        switch (typeElement) {
          // case "text":
          //   break;
          case "checkbox":
            position = "end";
            break;
          default:
            break;
        }
        this.elementControl = nativeElement;
        break;
      case "input-mask":
        this.elementControl = nativeElement.querySelector('.form-control');
        break;
      case "select2":
        this.elementControl = nativeElement.querySelector('.select2.select2-container');
        break;
      default:
        return this.toast.showErrorPopup('Lỗi tag', `Vô default - element ${tagElement} này chưa hỗ trợ validation`, true);
    }
    this.createNotifyValidation(this.elementControl, position as "after" | "end");
    this.updateValidationMessage(this.elementControl);
  }

  /**
   * cập nhật thông báo lỗi và hiển thị lên giao diện
   */
  private updateValidationMessage(elementControl: any): void {

    if (!this.ngControl.control?.dirty) return;

    // Kiểm tra xem elementControl có tồn tại không
    if (!elementControl) return;

    // Mảng chứa các thông báo lỗi
    let errorMessages: string = "";

    // Kiểm tra xem có thông báo lỗi tùy chỉnh từ ngControl không
    if (this.ngControl.errors?.['customErrorAPI'] || this.ngControl.errors?.['customError']) {
      errorMessages = Object.values(this.ngControl.errors)[0] ?? '';
    }
    else {
      // Lấy danh sách các key của lỗi từ ngControl
      const errorKeys = Object.keys(this.ngControl.errors ?? {})[0] ?? '';

      // Định dạng các key lỗi thành các thông báo sẵn có
      errorMessages = this.formatMessageValidate(errorKeys, this.ngControl.errors);
    }

    // Xóa nội dung trong phần hiển thị "invalid" và "valid"
    this.clearContent(this.elementValid);
    this.clearContent(this.elementInValid);

    // Kiểm tra xem có lỗi hay không
    const hasErrors = errorMessages && errorMessages.length > 0;

    // Xử lý lớp CSS dựa trên có lỗi hay không
    elementControl.classList.remove(hasErrors ? 'is-valid' : 'is-invalid');
    elementControl.classList.add(hasErrors ? 'is-invalid' : 'is-valid');

    // Hiển thị các thông báo lỗi lên giao diện
    if (hasErrors)
      this.addContent(this.elementInValid, errorMessages, 'div');
    // Nếu không có lỗi, hiển thị thông báo hợp lệ lên giao diện
    else {
      const valid = this.translocoService.translate(this.PATH_KEY_TRANSLATE + 'success');
      this.addContent(this.elementValid, valid, 'div');
    }

  }

  // Add content to inside element
  private addContent(element: any, content: string, tag: string) {
    if (!element) return;
    const eleContent = document.createElement(tag);
    eleContent.innerText = content;
    element.appendChild(eleContent);
  }

  // Clear the content of element
  private clearContent(element: any) {
    if (!element) return;
    element.innerHTML = '';
  }

  private createNotifyValidation(controlElement: any, position: "end" | "after") {
    /**
     * Thông báo lỗi
     */
    if (!controlElement) return this.toast.showErrorPopup('Lỗi', `Không có class chứa UI`, true);

    /**
     * Thêm thẻ div có class là "invalid-feedback" - "Lỗi xác thực"
     * @description Nếu có lỗi gì. Thì appendchild các lỗi vào thẻ có class này.
     */
    const invalidDiv = document.createElement('div');
    invalidDiv.classList.add('invalid-feedback');
    /**
     * Thêm thẻ div có class là "valid-feedback" - "đã xác thực"
     * @description Nếu không có lỗi. Thì appendchild nội dung muốn hiển thị vào bên trong này.
     */
    const validDiv = document.createElement('div');
    validDiv.classList.add('valid-feedback');

    switch (position) {
      case "after": // after a current element
        controlElement.parentNode.insertBefore(invalidDiv, controlElement.nextSibling);
        controlElement.parentNode.insertBefore(validDiv, controlElement.nextSibling);
        break;
      case "end": // end of element
        controlElement.parentNode.appendChild(invalidDiv, controlElement.nextSibling);
        controlElement.parentNode.appendChild(validDiv, controlElement.nextSibling);
        break;
      default:
        return this.toast.showErrorPopup('Lỗi đặt position', 'Tính năng này chưa được cập nhât', true);
    }
    this.elementInValid = invalidDiv;
    this.elementValid = validDiv;
  }

  /**
   * // TODO
   */
  private formatMessageValidate(key: string, data: any): string {
    if (!data) return '';
    /**
     * 29/09/2023
     // TODO: Khai báo các giá trị cần truy xuất. Sửa thì ở chỗ này
     * Hiện tại có các giá trị truy xuất theo yêu cầu thực tế của validators là như bên dưới
     * requiredPattern: nó trả về regrex, cho nên không dùng
     * // const requiredValidators = ["requiredLength", "requiredPattern", "max", "min"];
     */
    const requiredValidators = ["requiredLength", "max", "min"];
    let result: string = "";
    for (const item of requiredValidators) {
      if (data[key]?.[item]) {
        result = item;
      }
    }
    return this.translocoService.translate(this.PATH_KEY_TRANSLATE + 'errors.' + key,
      { value: result ? data[key]?.[result] : data[key] }) ?? ''
  }

}
