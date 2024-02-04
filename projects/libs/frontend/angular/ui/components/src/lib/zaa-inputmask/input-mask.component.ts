import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef,
} from '@angular/core';
import _ from 'lodash';
import { DEFAULT_INPUT_MASK } from './input-mask.variables';
import { InputMaskService } from './inputmask.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'input-mask',
  templateUrl: './input-mask.component.html',
  styleUrls: ['./input-mask.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMaskComponent),
      multi: true,
    }
  ]
})
export class InputMaskComponent implements OnChanges, ControlValueAccessor {
  // Dữ liệu truyền vào cho Input Mask
  @Input('type') type: string = DEFAULT_INPUT_MASK.type;
  @Input('format') format: string = DEFAULT_INPUT_MASK.format;
  @Input('hasHelpBlock') hasHelpBlock: boolean =
    DEFAULT_INPUT_MASK.hasHelpBlock;
  @Input('hasIcon') hasIcon: boolean = DEFAULT_INPUT_MASK.hasIcon;
  @Input('icon') icon: string = DEFAULT_INPUT_MASK.icon;
  @Input('placeholder') placeholder: string = DEFAULT_INPUT_MASK.placeholder;
  @Input('value') value: string = '';
  @Input('disabled') disabled: boolean = DEFAULT_INPUT_MASK.disabled;

  // Emmiter khi giá trị thay đổi
  @Output() valueChange = new EventEmitter();

  @ViewChild('inputmask') inputMaskSelector!: ElementRef<HTMLInputElement>;

  private element!: any;
  private inputSubject = new Subject<string>();

  constructor(private inputMaskService: InputMaskService) { }

  /**
 * @description Khi giá trị bên trong form thay đổi thì method này sẽ tự động gọi
 * @param value - form truyền đối số được cập nhật vào
 */
  writeValue(value: any): void {
    this.value = value ?? '';
    // update
    if (!this.element) return;
    this.setData(this.element);
  }

  _onChange = (value: any) => { };
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  onTouched = () => { };
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  // Lắng nghe sự kiện thay đổi lần đầu khi call api data về
  ngOnChanges(changes: SimpleChanges) {
    if (!this.element) return;
    const { currentValue, previousValue } = changes['value'];
    if (_.isEqual(currentValue, previousValue)) return;
    this.value = currentValue;
    // Call func set data
    this._onChange(currentValue);
    this.setData(this.element);
  }

  ngAfterViewInit(): void {
    // Khởi lại js cho input mask
    this.initPlugin();
  }

  ngOnDestroy(): void {
    // Sau khi component unmount sẽ clean-up các sự kiện
    if (this.element) this.element.off('input');
    this.inputSubject.unsubscribe();
  }

  initPlugin(): void {
    // Lấy dom của các Input Mask
    this.element = !_.isNil(this.inputMaskSelector)
      ? $(this.inputMaskSelector.nativeElement)
      : '';

    // Truyền dữ liệu và kích hoạt js cho Input Mask
    this.inputMaskService.activeJsInputMask(this.element);

    // Lắng nghe sự kiện thay đổi
    this.handleOnChange(this.element);
  }

  // Format lại data-inputmask binding
  formattedInputMask(type: string, format: string): string {
    return `'${type}':'${format}'`;
  }

  // Func update data
  setData(element: any) {
    if (!element) return;
    element.inputmask('setvalue', this.value);
  }

  // Func lắng nghe sự kiện thay đổi
  handleOnChange(element: any) {
    if (!element) return;
    const delayTime = 500;
    element.on('input', (e: any) => {
      const { value } = e.target;
      this.inputSubject.next(value);
    });
    this.inputSubject
      .pipe(
        debounceTime(delayTime), //Độ trễ 500 milliseconds
        distinctUntilChanged() //Chỉ gửi giá trị nếu nó thay đổi
      )
      .subscribe((value) => {
        this._onChange(value);
        this.valueChange.emit(value);
      });
  }
}
