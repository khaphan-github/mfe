/**
 * @param orientation: Vị trí hiển thị của datepicker
 * @param todayHighlight: Ngày hiện tại sẽ được nổi bật
 * @param todayBtn: Hiển thị button Today, chức năng chọn ngày hiện tại
 * @param clearBtn: Hiển thị button Clear, chức năng xóa ngày đã chọn
 * @param placeholder: Văn bản gợi ý hiển thị khi chưa chọn ngày nào
 * @param hasIcon: Hiển thị icon
 * @param icon: ClassName thay đổi icon
 * @param readonly: Chỉ cho phép đọc không được chỉnh sửa input
 * @param isRange: Hiển thị range của datepicker
 * @param format: Định dạng thời gian
 */

type DatePickerSingle_Type = {
  element: any;
  orientation?: string;
  todayHighlight?: boolean;
  todayBtn?: boolean;
  clearBtn?: boolean;
  placeholder?: string;
  hasIcon?: boolean;
  icon?: string;
  readonly?: boolean;
  isInline?: boolean;
  isRange?: boolean;
  format?: string;
};

type OpenPickerType = 'left' | 'right';

/**
 * @param opens: Vị trí hiển thị của datepicker
 * @param hasIcon: Hiển thị icon
 * @param timePicker: Cho phép chọn giờ bên cạnh việc chọn ngày
 * @param singleDatePicker: Cho phép chỉ chọn một ngày thay vì dải ngày
 * @param showDropdowns: Hiển thị các danh sách thả xuống để dễ dàng chọn tháng và năm
 * @param isPredefined: Xác định xem dải ngày có được xác định trước sẵn hay không
 * @param showWeekNumbers: Hiển thị số tuần trong năm cùng với ngày
 * @param showISOWeekNumbers: Hiển thị số tuần ISO trong năm cùng với ngày
 * @param timePicker24Hour: Sử dụng định dạng 24 giờ cho chọn giờ
 * @param timePickerSeconds: Cho phép chọn giây bên cạnh chọn giờ
 * @param autoApply: Tự động áp dụng dải ngày khi chọn xong mà không cần bấm nút áp dụng
 * @param maxDays: Giới hạn số ngày tối đa cho phép trong dải ngày
 * @param alwaysShowCalendars: Luôn hiển thị cả hai lịch để chọn ngày, kể cả khi đang chọn ngày trong dải
 * @param placeholder: Văn bản gợi ý hiển thị
 * @param icon: ClassName thay đổi icon
 * @param applyButtonClasses: Lớp CSS áp dụng cho nút áp dụng
 * @param cancelClass: Lớp CSS áp dụng cho nút hủy bỏ
 * @param format: Định dạng thời gian
 */

type DatePickerRange_Type = {
  element: any;
  opens?: OpenPickerType;
  hasIcon?: boolean;
  timePicker?: boolean;
  singleDatePicker?: boolean;
  showDropdowns?: boolean;
  isPredefined?: boolean;
  showWeekNumbers?: boolean;
  showISOWeekNumbers?: boolean;
  timePicker24Hour?: boolean;
  timePickerSeconds?: boolean;
  autoApply?: boolean;
  maxDays?: number;
  alwaysShowCalendars?: boolean;
  placeholder?: string;
  icon?: string;
  applyButtonClasses?: string;
  cancelClass?: string;
  format?: string;
};

/**
 * @param hasIcon: Hiển thị icon
 * @param label: Nhãn hiển thị trên datepicker range
 * @param placeholder: Văn bản gợi ý hiển thị
 * @param icon: ClassName thay đổi icon
 * @param isRange: Hiển thị range của datepicker
 * @param readonly: Chỉ cho phép đọc không được chỉnh sửa input
 * @param format: Định dạng thời gian
 */

type DatePickerMat_Type = {
  id: string,
  hasIcon: boolean,
  label: string,
  placeholder: string,
  icon: string,
  isRange: boolean,
  readonly: boolean,
  format: string,
};

export { DatePickerSingle_Type, DatePickerRange_Type, OpenPickerType, DatePickerMat_Type };
