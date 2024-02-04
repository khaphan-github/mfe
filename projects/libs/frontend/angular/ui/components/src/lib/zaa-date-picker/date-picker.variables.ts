//----------------------------- DỮ LIỆU DEFAULT CHO DATEPICKER SINGLE

// Icon dùng cho datepicker
enum DatePickerIcons_Enum {
  calendar = 'fa-calendar',
  calendar_alt = 'fa-calendar-alt',
  calendar_check = 'fa-calendar-check',
  calendar_times = 'fa-calendar-times',
  calendar_exclamation = 'fa-calendar-exclamation',
  calendar_plus = 'fa-calendar-plus',
  ellipsis_h = 'fa-ellipsis-h',
}

// Vị trí hiển thị datepicker single
enum DatePickerOrientation_Enum {
  bottom_left = 'bottom left',
  bottom_right = 'bottom right',
  top_left = 'top left',
  top_right = 'top right',
}

/**
 * format1: July 26th 2023, 4:09:38 pm
 * format2: Wednesday
 * format3: Jul 26th 23
 * format4: 07/26/2023
 * format5: 7/26/2023
 * format6: July 26, 2023
 * format7: Jul 26, 2023
 * format8: July 26, 2023 4:12 PM
 * format9: Jul 26, 2023 4:12 PM
 * format10: Wednesday, July 26, 2023 4:12 PM
 * format11: Wed, Jul 26, 2023 4:12 PM
 */
enum LocaleMoment_Enum {
  format1 = 'MMMM Do YYYY, h:mm:ss a',
  format2 = 'dddd',
  format3 = 'MMM Do YY',
  format4 = 'L',
  format5 = 'l',
  format6 = 'LL',
  format7 = 'll',
  format8 = 'LLL',
  format9 = 'lll',
  format10 = 'LLLL',
  format11 = 'llll',
}

const DEFAULT_DATE_PICKER_SINGLE = {
  todayHighlight: false,
  orientation: DatePickerOrientation_Enum.bottom_left,
  todayBtn: false,
  clearBtn: false,
  placeholder: 'Select Date',
  hasIcon: false,
  icon: DatePickerIcons_Enum.calendar,
  readonly: false,
  disabled: false,
  isInline: false,
  isRange: false,
  format: LocaleMoment_Enum.format4,
  maxDate: '',
  minDate: ''
};

//----------------------------- DỮ LIỆU DEFAULT CHO DATEPICKER RANGE

const DEFAULT_DATE_PICKER_RANGE = {
  open: 'left',
  hasIcon: false,
  timePicker: false,
  singleDatePicker: false,
  showDropdowns: false,
  isPredefined: false,
  showWeekNumbers: false,
  showISOWeekNumbers: false,
  timePicker24Hour: false,
  timePickerSeconds: false,
  autoApply: false,
  disabled: false,
  maxDays: 0,
  alwaysShowCalendars: false,
  placeholder: 'Select Date',
  icon: DatePickerIcons_Enum.calendar_times,
  format: LocaleMoment_Enum.format4,
};

//----------------------------- DỮ LIỆU DEFAULT CHO DATEPICKER RANGE MAT

const DEFAULT_DATE_PICKER_MAT = {
  id: 'datepicker-mat-default',
  hasIcon: false,
  label: 'Date',
  placeholder: 'Select Date',
  icon: DatePickerIcons_Enum.calendar_times,
  isRange: false,
  readonly: false,
  format: LocaleMoment_Enum.format4,
};

export {
  DEFAULT_DATE_PICKER_SINGLE,
  DEFAULT_DATE_PICKER_RANGE,
  DEFAULT_DATE_PICKER_MAT,
  DatePickerIcons_Enum,
  DatePickerOrientation_Enum,
  LocaleMoment_Enum,
};
