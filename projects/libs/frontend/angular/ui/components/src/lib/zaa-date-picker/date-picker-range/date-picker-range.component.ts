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
import { OpenPickerType } from '../date-picker.type';
import { DEFAULT_DATE_PICKER_RANGE } from '../date-picker.variables';
import { DatePickerService } from '../datepicker.service';
import { Uuid } from '@shared/components/zaa-notication/helpers/uuid/uuid.helper';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormatDatesConfigVariables } from '../formatDates.config';

declare var $: any;
@Component({
  selector: 'date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerRangeComponent),
      multi: true,
    }
  ]
})
export class DatePickerRangeComponent implements OnChanges, OnInit, ControlValueAccessor {
  // Dữ liệu truyền vào cho Datepicker Single
  @Input('opens') opens: OpenPickerType = 'left';
  @Input('hasIcon') hasIcon: boolean = DEFAULT_DATE_PICKER_RANGE.hasIcon;
  @Input('timePicker') timePicker: boolean = DEFAULT_DATE_PICKER_RANGE.timePicker;
  @Input('singleDatePicker') singleDatePicker: boolean = DEFAULT_DATE_PICKER_RANGE.singleDatePicker;
  @Input('showDropdowns') showDropdowns: boolean = DEFAULT_DATE_PICKER_RANGE.showDropdowns;
  @Input('isPredefined') isPredefined: boolean = DEFAULT_DATE_PICKER_RANGE.isPredefined;
  @Input('showWeekNumbers') showWeekNumbers: boolean = DEFAULT_DATE_PICKER_RANGE.showWeekNumbers;
  @Input('showISOWeekNumbers') showISOWeekNumbers: boolean = DEFAULT_DATE_PICKER_RANGE.showISOWeekNumbers;
  @Input('timePicker24Hour') timePicker24Hour: boolean = DEFAULT_DATE_PICKER_RANGE.timePicker24Hour;
  @Input('timePickerSeconds') timePickerSeconds: boolean = DEFAULT_DATE_PICKER_RANGE.timePickerSeconds;
  @Input('autoApply') autoApply: boolean = DEFAULT_DATE_PICKER_RANGE.autoApply;
  @Input('maxDays') maxDays: number = DEFAULT_DATE_PICKER_RANGE.maxDays;
  @Input('alwaysShowCalendars') alwaysShowCalendars: boolean = DEFAULT_DATE_PICKER_RANGE.alwaysShowCalendars;
  @Input('applyButtonClasses') applyButtonClasses: string = 'btn-primary';
  @Input('cancelClass') cancelClass: string = 'btn-default';
  @Input('placeholder') placeholder: string = DEFAULT_DATE_PICKER_RANGE.placeholder;
  @Input('disabled') disabled = DEFAULT_DATE_PICKER_RANGE.disabled;
  @Input('icon') icon: string = DEFAULT_DATE_PICKER_RANGE.icon;
  @Input('format') format: string = DEFAULT_DATE_PICKER_RANGE.format;
  @Input('value') value: any;

  // Emmiter khi giá trị thay đổi
  @Output() valueChange = new EventEmitter();

  @ViewChild('datepickerRangeInput') selector!: ElementRef<HTMLInputElement>;

  startDateFormatted: any;
  endDateFormatted: any;
  id: string = new Uuid().uuid();
  currentFormatLocale: string = FormatDatesConfigVariables.defaultFormatLocale;

  private element: any = undefined;

  constructor(private datepickerService: DatePickerService) { }

  /**
   * @description Khi giá trị bên trong form thay đổi thì method này sẽ tự động gọi
   * @param value - form truyền đối số được cập nhật vào
   */
  writeValue(value: any): void {
    this.value = value ?? '';
    if (!this.element && !value) return;
    this.setData(this.element, this.value);
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
      if (!this.element) return;
      const { currentValue, previousValue } = changes['value'];
      if (_.isEqual(currentValue, previousValue)) return;
      // this.value = currentValue;
      // Call func set data
      // this.onTouched();
      this._onChange(currentValue);
      this.setData(this.element, currentValue);
      this.handleFormatDate(currentValue);
    }
  }

  ngAfterViewInit(): void {
    // Khởi lại js cho datepicker range
    this.initPlugin();
  }

  ngOnDestroy(): void {
    // Sau khi component unmount sẽ clean-up các sự kiện
    if (this.element) this.element.data('daterangepicker').remove();
  }

  initPlugin(): void {
    // Lấy dom của các input DatePicker Single
    this.element = !_.isNil(this.selector)
      ? $(this.selector.nativeElement)
      : '';

    const data = {
      element: this.element,
      id: this.id,
      opens: this.opens,
      timePicker: this.timePicker,
      singleDatePicker: this.singleDatePicker,
      showDropdowns: this.showDropdowns,
      isPredefined: this.isPredefined,
      showWeekNumbers: this.showWeekNumbers,
      showISOWeekNumbers: this.showISOWeekNumbers,
      timePicker24Hour: this.timePicker24Hour,
      timePickerSeconds: this.timePickerSeconds,
      autoApply: this.autoApply,
      maxDays: this.maxDays,
      alwaysShowCalendars: this.alwaysShowCalendars,
      applyButtonClasses: this.applyButtonClasses,
      cancelClass: this.cancelClass,
      formatValue: FormatDatesConfigVariables.defaultFormatValue,
    };

    // Truyền dữ liệu và kích hoạt js cho Datepicker Range
    this.datepickerService.activeJsDatePickerRange(data);

    // Lắng nghe sự kiện thay đổi
    this.handleOnChange(this.element);
  }

  // Func update data
  setData(element: any, data: any) {
    if (!element) return;
    element.data('daterangepicker').setStartDate(data);
    if (!this.singleDatePicker) {
      const { startDate, endDate } = data;
      if(!startDate && !endDate) return;
      element.data('daterangepicker').setStartDate(startDate);
      element.data('daterangepicker').setEndDate(endDate);
    }
  }

  // Func lắng nghe sự kiện thay đổi
  handleOnChange(element: any): void {
    if (!element) return;
    element.on('apply.daterangepicker', () => {
      let dateValue: any = element.val();
      if (!this.singleDatePicker) {
        const [startDate, endDate] = element.val().split(' - ');
        dateValue = {
          startDate: startDate,
          endDate: endDate,
        };
      }
      this._onChange(dateValue);
      // TODO: lúc xuất hiện date là 1 template khác ở position khác.
      // this.onTouched();
      this.valueChange.emit(dateValue);
      this.handleFormatDate(dateValue);
    });
  }

  // Func xử lý format ngày display
  handleFormatDate(data: any) {
    this.startDateFormatted = this.textFormatted(data);
    if (!this.singleDatePicker) {
      const { startDate, endDate } = data;
      this.startDateFormatted = this.textFormatted(startDate);
      this.endDateFormatted = this.textFormatted(endDate);
    }
  }

  // Func format ngày theo định dạng và vùng
  textFormatted(data: any): string {
    if (!data) return '';
    return moment(new Date(data))
      .locale(this.currentFormatLocale)
      .format(this.format);
  }
}
