import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import moment from 'moment';
import { DEFAULT_DATE_PICKER_MAT } from '../date-picker.variables';
import { FormatDatesConfigVariables } from '../formatDates.config';

@Component({
  selector: 'date-picker-mat',
  templateUrl: './date-picker-mat.component.html',
  styleUrls: ['./date-picker-mat.component.css'],
})
export class DatePickerMatComponent implements OnChanges, OnInit {
  // Dữ liệu truyền vào cho Datepicker Single
  @Input('id') id: string = DEFAULT_DATE_PICKER_MAT.id;
  @Input('hasIcon') hasIcon: boolean = DEFAULT_DATE_PICKER_MAT.hasIcon;
  @Input('label') label: string = DEFAULT_DATE_PICKER_MAT.label;
  @Input('placeholder') placeholder: string =
    DEFAULT_DATE_PICKER_MAT.placeholder;
  @Input('icon') icon: string = DEFAULT_DATE_PICKER_MAT.icon;
  @Input('isRange') isRange: boolean = DEFAULT_DATE_PICKER_MAT.isRange;
  @Input('readonly') readonly: boolean = DEFAULT_DATE_PICKER_MAT.readonly;
  @Input('format') format: string = DEFAULT_DATE_PICKER_MAT.format;
  @Input('value') value: any = '';

  startDate: any = '';
  endDate: any = '';
  startDateFormatted: any = '';
  endDateFormatted: any = '';
  currentFormatLocale: string = FormatDatesConfigVariables.defaultFormatLocale;

  // Emmiter khi giá trị thay đổi
  @Output() valueChange = new EventEmitter();

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
      this.value = new Date(this.value);
      const { currentValue, previousValue } = changes['value'];
      if (previousValue) return;
      if (!this.isRange && currentValue) {
        this.value = new Date(currentValue);
      } else if (currentValue) {
        const { startDate, endDate } = currentValue;
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
      }
      this.handleFormatDate(currentValue);
    }
  }

  // Lắng nghe sự kiện thay đổi lần đầu khi call api data về
  onDateChange(e: any, name?: 'startDate' | 'endDate') {
    if (!e.hasOwnProperty('value')) return;
    const { value } = e;
    let dateValue: any;
    if (!this.isRange) {
      dateValue = this.valueFormatted(value);
    } else if (name) {
      dateValue = {
        startDate: this.valueFormatted(this.startDate),
        endDate: this.endDate ? this.valueFormatted(this.endDate) : '',
      };
    }

    this.valueChange.emit(dateValue);
    this.handleFormatDate(dateValue);
  }

  // Func xử lý format ngày display
  handleFormatDate(data: any) {
    if (!data) return;
    if (!this.isRange) {
      this.startDateFormatted = this.textFormatted(data);
    } else {
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

  // Func format lại value để save vào db
  valueFormatted(data: any): string {
    if (!data) return '';
    return moment(new Date(data)).format(
      FormatDatesConfigVariables.defaultFormatValue
    );
  }
}
