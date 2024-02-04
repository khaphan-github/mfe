import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  forwardRef,
} from '@angular/core';
import _ from 'lodash';
import moment from 'moment';
import { DEFAULT_DATE_PICKER_SINGLE } from '../date-picker.variables';
import { DatePickerService } from '../datepicker.service';
import { Uuid } from '@shared/components/zaa-notication/helpers/uuid/uuid.helper';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormatDatesConfigVariables } from '../formatDates.config';

declare var $: any;
@Component({
  selector: 'date-picker-single',
  templateUrl: './date-picker-single.component.html',
  styleUrls: ['./date-picker-single.component.css'], providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerSingleComponent),
      multi: true,
    }
  ]
})
export class DatePickerSingleComponent implements OnChanges, OnInit, ControlValueAccessor {
  // Dữ liệu truyền vào cho Datepicker Single
  @Input('todayHighlight') todayHighlight: boolean = DEFAULT_DATE_PICKER_SINGLE.todayHighlight;
  @Input('orientation') orientation: string = DEFAULT_DATE_PICKER_SINGLE.orientation;
  @Input('todayBtn') todayBtn: boolean = DEFAULT_DATE_PICKER_SINGLE.todayBtn;
  @Input('clearBtn') clearBtn: boolean = DEFAULT_DATE_PICKER_SINGLE.clearBtn;
  @Input('placeholder') placeholder: string = DEFAULT_DATE_PICKER_SINGLE.placeholder;
  @Input('hasIcon') hasIcon: boolean = DEFAULT_DATE_PICKER_SINGLE.hasIcon;
  @Input('icon') icon: string = DEFAULT_DATE_PICKER_SINGLE.icon;
  @Input('readonly') readonly: boolean = DEFAULT_DATE_PICKER_SINGLE.readonly;
  @Input('disabled') disabled: boolean = DEFAULT_DATE_PICKER_SINGLE.disabled;
  @Input('isInline') isInline: boolean = DEFAULT_DATE_PICKER_SINGLE.isInline;
  @Input('isRange') isRange: boolean = DEFAULT_DATE_PICKER_SINGLE.isRange;
  @Input('format') format: string = DEFAULT_DATE_PICKER_SINGLE.format;
  @Input('value') value: any;
  @Input('maxDate') maxDate: string = DEFAULT_DATE_PICKER_SINGLE.maxDate;
  @Input('minDate') minDate: string = DEFAULT_DATE_PICKER_SINGLE.minDate;

  // Emmiter khi giá trị thay đổi
  @Output() valueChange = new EventEmitter();

  @ViewChild('datepickerInput_single')
  startDateSelector!: ElementRef<HTMLInputElement>;
  @ViewChild('datepickerInput2_single')
  endDateSelector!: ElementRef<HTMLInputElement>;
  @ViewChild('datepickerInput_single_wrapper')
  dateWrapperSelector!: ElementRef<HTMLInputElement>;
  @ViewChild('datepickerInput_single_inline')
  dateInlineSelector!: ElementRef<HTMLInputElement>;

  startDateFormatted: any;
  endDateFormatted: any;
  id: string = new Uuid().uuid();
  currentFormatLocale: string = FormatDatesConfigVariables.defaultFormatLocale;

  private dateInlineElement: any = undefined;
  private startDateElement: any = undefined;
  private endDateElement: any = undefined;
  private dateWrapperElement: any = undefined;

  constructor(private datepickerService: DatePickerService) { }

  /**
   * @description Khi giá trị bên trong form thay đổi thì method này sẽ tự động gọi
   * @param value - form truyền đối số được cập nhật vào
   */
  writeValue(value: any): void {
    this.value = value ?? '';
    if (!this.getElement && !value) return;
    this.setData(this.getElement, this.value);
    this.handleFormatDate(this.value);
  }

  _onChange = (value: any) => { };
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  onTouched = () => { };
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {
    // Lấy định dạng vùng hiện tại
    this.currentFormatLocale =
      localStorage.getItem(
        FormatDatesConfigVariables.currentFormatStorageKey
      ) ?? FormatDatesConfigVariables.defaultFormatLocale;
  }

  // Lắng nghe sự kiện thay đổi lần đầu khi call api data về
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('value')) {
      if (!this.getElement) return;
      const { currentValue, previousValue } = changes['value'];
      if (_.isEqual(currentValue, previousValue)) return;
      // Call func set data
      this._onChange(currentValue);
      this.setData(this.getElement, currentValue);
      this.handleFormatDate(currentValue);
    }
    if(changes.hasOwnProperty('maxDate') || changes.hasOwnProperty('minDate')) {
      if (!this.getElement) return;
      if(this.maxDate) this.getElement.datepicker('setEndDate', this.maxDate);
      if(this.minDate) this.getElement.datepicker('setStartDate', this.minDate);
    }
  }

  ngAfterViewInit(): void {
    // Khởi lại js cho datepicker single
    this.initPlugin();
  }

  ngOnDestroy(): void {
    // Sau khi component unmount sẽ clean-up các sự kiện
    if (this.startDateElement) this.startDateElement.off('changeDate');
    if (this.endDateElement) this.endDateElement.off('changeDate');
    if (this.dateInlineElement) this.dateInlineElement.off('changeDate');
  }

  initPlugin(): void {
    // Lấy dom của các input DatePicker Single
    this.initGetDom();

    const data = {
      element: this.getElement,
      id: this.id,
      orientation: this.orientation,
      todayHighlight: this.todayHighlight,
      todayBtn: this.todayBtn,
      clearBtn: this.clearBtn,
    };

    // Truyền dữ liệu và kích hoạt js cho Datepicker Single
    this.datepickerService.activeJsDatePicker(data);

    // Lắng nghe sự kiện thay đổi
    this.handleOnChange(this.startDateElement);
    this.handleOnChange(this.endDateElement);
    this.handleOnChange(this.dateInlineElement);
  }

  // Khởi tạo dom lần đầu
  initGetDom(): void {
    this.startDateElement = !_.isNil(this.startDateSelector)
      ? $(this.startDateSelector.nativeElement)
      : '';
    this.endDateElement = !_.isNil(this.endDateSelector)
      ? $(this.endDateSelector.nativeElement)
      : '';
    this.dateWrapperElement = !_.isNil(this.dateWrapperSelector)
      ? $(this.dateWrapperSelector.nativeElement)
      : '';
    this.dateInlineElement = !_.isNil(this.dateInlineSelector)
      ? $(this.dateInlineSelector.nativeElement)
      : '';
  }

  // Get element instance để apply js sử dụng các properties
  get getElement(): any {
    let element = this.startDateElement;
    if (this.isRange) element = this.dateWrapperElement;
    if (this.isInline) element = this.dateInlineElement;
    return element;
  }

  // Func update data
  setData(element: any, data: any): void {
    if (!element) return;
    if (this.isRange) {
      const { startDate, endDate } = data;
      if(!startDate && !endDate) return;
      $(`input[name="start${this.id}"]`).datepicker(
        'update',
        new Date(startDate)
      );
      $(`input[name="end${this.id}"]`).datepicker('update', new Date(endDate));
      return;
    }
    element.datepicker('update', new Date(data));
  }

  // Func lắng nghe sự kiện thay đổi
  handleOnChange(element: any): void {
    if (!element) return;
    element.on('changeDate', (e: any) => {
      // Mặc định nếu không phải Datepicker Range thì chỉ cần gửi 1 date không cần ngày bắt đầu và kết thúc
      let dateValue: any;
      if (!this.isInline) {
        dateValue = this.valueFormatted(this.startDateElement.val());
      }

      if (this.isRange) {
        dateValue = {
          startDate: this.valueFormatted(this.startDateElement.val()),
          endDate: this.valueFormatted(this.endDateElement.val()),
        };

        /**
         * Kiểm tra xem có khoảng thời gian chưa trước khi emit,
         * tránh emit 2 lần khi chọn ngày bắt đầu js của datepicker sẽ tự chọn ngày kết thúc bằng ngày bắt đầu
         */
        if (!this.startDateElement.val() || !this.endDateElement.val()) return;
      }

      // Format lại ngày tháng khi dùng Datepicker Inline
      if (this.isInline) dateValue = this.valueFormatted(e.date);
      this._onChange(dateValue);
      // this.onTouched();
      this.valueChange.emit(dateValue);
      this.handleFormatDate(dateValue);
    });
  }

  // Func xử lý format ngày display
  handleFormatDate(data: any) {
    if (this.isRange) {
      const { startDate, endDate } = data;
      this.startDateFormatted = this.textFormatted(startDate);
      this.endDateFormatted = this.textFormatted(endDate);
    } else {
      this.startDateFormatted = this.textFormatted(data);
    }
  }

  // Func format ngày theo định dạng và vùng
  textFormatted(data: any): string {
    if (data == 'Invalid Date' || !data) return '';
    return moment(new Date(data))
      .locale(this.currentFormatLocale)
      .format(this.format);
  }

  // Func format lại value để save vào db
  valueFormatted(data: any): string {
    if (!data) return '';
    return moment(new Date(data)).format(
      FormatDatesConfigVariables.defaultFormatValue
    );
  }
}
