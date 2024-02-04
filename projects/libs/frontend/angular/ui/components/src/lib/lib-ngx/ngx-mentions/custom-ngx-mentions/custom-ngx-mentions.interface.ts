import { TemplateRef } from "@angular/core";
import { IValueOutputMention } from "../lib/ngx-mentions.interface";
import { Observable } from "rxjs";

/**
 * Một danh sách hiển thị bao gồm các lựa chọn và thuộc tính hiển thị.
 */
export type DisplayList = {
  /** Danh sách các lựa chọn. */
  choices: any[];

  /** Thuộc tính dùng để hiển thị cho mỗi lựa chọn. */
  displayAttribute: string;

  /** Template để hiển thị lựa chọn trong menu. */
  template?: TemplateRef<any>;
}

/**
 * Cấu hình đề cập cho mỗi ký tự kích hoạt.
 */
export type MentionConfig = {
  /** Ký tự kích hoạt để bắt đầu việc đề cập. */
  triggerCharacter: string;

  /** Thuộc tính dùng để tìm kiếm trong danh sách lựa chọn. */
  searchBy: string;

  /** Hàm để lấy nhãn cho mỗi lựa chọn. */
  getChoiceLabel: (choice: any) => string;

  /** Observable dùng để tải dữ liệu cho việc đề cập. */
  source$: (args?: any) => Observable<any>;

  /** Template để hiển thị lựa chọn trong menu. */
  selectorTemplate?: TemplateRef<any>;

  /** Xác định xem liệu các lựa chọn phải là duy nhất hay không. */
  unique?: boolean | false;

  /** Xác định xem liệu tìm kiếm phải thông qua API hay không. */
  searchByAPI?: boolean | false;
}

/**
 * Cấu hình tùy chỉnh cho ngx-mentions.
 */
export type CustomNgxMentionsConfig = {
  /** Template cho menu hiển thị lựa chọn. */
  menuTemplate?: TemplateRef<any>;
  /** Giá trị khởi tạo ban đầu cho thành phần đề cập. */
  initValue?: IValueOutputMention;
  /** Biểu thức chính quy để kiểm tra văn bản đề cập. */
  searchRegexp?: RegExp;
  /** Danh sách cấu hình đề cập cho các ký tự kích hoạt. */
  mentionConfig: MentionConfig[];
  /** Hàm gọi lại khi giá trị thay đổi trong thành phần đề cập. */
  valueChanged(event: IValueOutputMention): void;
  /** Hàm gọi lại khi người dùng nhấp vào một thẻ đề cập. */
  onclickTag(event: any): void;
}
