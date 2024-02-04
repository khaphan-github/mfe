/**
 * @param type: Có 2 loại alias và mask
 * Alias: Định dạng đặc biệt đã được định nghĩa sẵn.
 * Chẳng hạn, "alias: 'currency'" sẽ định dạng giá trị đầu vào dưới dạng tiền tệ với ký hiệu.
 * Mask: Định dạng tùy chỉnh cho giá trị đầu vào. Như "9" để đại diện cho chữ số, "*" để đại diện
 *  cho chữ cái, ":" để làm dấu phân cách, v.v.
 * @param format: Các dạng format cho alias và mask
 * @param hasHelpBlock: Gợi ý văn bản bên dưới
 * @param hasIcon: Hiển thị icon
 * @param icon: ClassName thay đổi icon
 * @param placeholder: Văn bản gợi ý hiển thị
 */

type InputMask_Type = {
  type: string;
  format: string;
  hasHelpBlock?: string;
  hasIcon?: boolean;
  icon?: string;
  placeholder?: string;
};

export { InputMask_Type };
