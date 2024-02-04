import { Formats } from '../tinyMCE-lib/editor/tinymce';

/**
 * @param apiKey: Khóa API cho việc xác thực và tương tác với dịch vụ liên quan đến TinyMCE.
 * @param cloudChannel: Kênh cloud cho việc cập nhật TinyMCE.
 * @param disabled: Xác định xem trình soạn thảo TinyMCE có bị vô hiệu hóa (không thể sử dụng) hay không.
 * @param id: ID của trình soạn thảo TinyMCE, cho phép bạn xác định một ID cụ thể cho trình soạn thảo.
 * @param init: Tùy chọn cấu hình cho khởi tạo của TinyMCE, chứa các thiết lập cụ thể cho trình soạn thảo.
 * @param plugins: Các plugin mà bạn muốn tích hợp vào TinyMCE, có thể là một mảng các tên plugin hoặc một chuỗi các tên plugin.
 * @param toolbar: Các công cụ trình soạn thảo bạn muốn hiển thị trong thanh công cụ.
 * @param tagName: Thẻ HTML bạn muốn sử dụng để nhúng trình soạn thảo TinyMCE vào trang web.
 * @param inline: Chế độ "inline" cho phép bạn nhúng TinyMCE trực tiếp vào trang web (true) hoặc trong một iframe (false).
 * @param outputFormat: Định dạng đầu ra cho nội dung được tạo ra bởi trình soạn thảo, chẳng hạn như HTML hoặc văn bản thuần túy.
 */
type TTinyMCE = {
  [key: string]: any;
  apiKey?: string;
  cloudChannel?: string;
  disabled?: boolean;
  id?: string;
  init?: TInit;
  plugins?: TPlugins[] | string;
  toolbar?: TToolbar[];
  tagName?: string;
  inline?: boolean;
  outputFormat?: TOutputFormat;
};

/**
 * @param height: Chiều cao của trình soạn thảo TinyMCE.
 * @param menubar: Thanh menu và các mục menu bạn muốn hiển thị trong giao diện trình soạn thảo.
 * @param toolbar_sticky: Xác định xem thanh công cụ có nên được giữ cố định (sticky) khi cuộn trang hay không.
 * @param toolbar_sticky_offset: Độ dời (offset) của thanh công cụ khi ở chế độ sticky.
 * @param autosave_ask_before_unload: Xác định xem người dùng có nên được hỏi trước khi rời khỏi trang khi có dữ liệu đã thay đổi không.
 * @param autosave_interval: Khoảng thời gian giữa các lần tự động lưu dữ liệu.
 * @param autosave_prefix: Tiền tố cho tên các phiên bản lưu tự động của dữ liệu.
 * @param autosave_restore_when_empty: Xác định xem có nên khôi phục phiên bản lưu tự động khi trình soạn thảo trống không hay không.
 * @param autosave_retention: Thời gian giữ lại (retention) của phiên bản lưu tự động trước khi bị xóa.
 * @param image_title: Cho phép hiển thị tiêu đề (title) của hình ảnh khi di chuột qua.
 * @param file_picker_types: Loại tệp được chấp nhận khi sử dụng trình chọn tệp.
 * @param image_advtab: Cho phép chế độ nâng cao (advanced) khi chèn hình ảnh.
 * @param image_caption: Cho phép việc thêm chú thích (caption) cho hình ảnh.
 * @param image_list: Danh sách hình ảnh sẵn có để chọn khi chèn hình ảnh.
 * @param image_class_list: Danh sách các lớp (classes) cho hình ảnh.
 * @param automatic_uploads: Cho phép tải lên hình ảnh tự động khi chèn chúng từ máy tính.
 * @param file_picker_callback: Hàm callback được gọi khi chọn tệp.
 * @param quickbars_selection_toolbar: Công cụ thanh toolbar cho lựa chọn văn bản.
 * @param toolbar_mode: Chế độ thanh công cụ, chẳng hạn như 'floating' hoặc 'sliding'.
 * @param skin: Giao diện (skin) cho trình soạn thảo.
 * @param content_css: Đường dẫn đến tệp CSS tùy chỉnh để áp dụng cho nội dung trong trình soạn thảo.
 * @param src_content_css: Bộ styles cần áp dụng vào trình soạn thảo.
 * @param content_style: CSS tùy chỉnh để áp dụng cho nội dung trong trình soạn thảo.
 * @param font_size_formats: Các định dạng kích thước font chữ cho lựa chọn.
 * @param font_family_formats: Định dạng gia đình font chữ cho lựa chọn.
 * @param style_formats: cho phép bạn định nghĩa các định dạng style tùy chỉnh. Mỗi đối tượng trong mảng style_formats đại diện cho một định dạng style.
 * @param style_formats_merge: Hợp nhất các định dạng
 * @param importcss_append: Dùng để xử lý việc nối các tệp css vào nội dung nếu dùng style_formats phải bật này thành true
 * @param formats: Định dạng có thể bao gồm các kiểu dáng văn bản, cấu trúc phần tử, hoặc các định dạng đặc biệt khác. Tham số này thường là một mảng hoặc một danh sách các định dạng.
 */
type TInit = {
  // core
  height?: number;
  menubar?: TMenubar[] | string;
  toolbar_sticky?: boolean;
  toolbar_sticky_offset?: number;
  autosave_ask_before_unload?: boolean;
  autosave_interval?: string;
  autosave_prefix?: string;
  autosave_restore_when_empty?: boolean;
  autosave_retention?: string;
  image_title?: boolean;
  file_picker_types?: TFilePickerTypes[] | string;
  image_advtab?: boolean;
  image_caption?: boolean;
  image_list?: TImageList[];
  image_class_list?: TImageList[];
  automatic_uploads?: boolean;
  file_picker_callback?: FilePickerCallback;
  // quickbars
  quickbars_selection_toolbar?: TToolbar[] | string;
  // toolbar
  toolbar_mode?: TToolbarMode;
  // mode
  skin?: TSkin;
  // font
  font_size_formats?: string[] | string;
  font_family_formats?: string;
  // styles
  content_css?: TContentCss;
  src_content_css?: string[];
  content_style?: string;
  style_formats?: TStyleFormats[];
  style_formats_merge?: boolean;
  importcss_append?: boolean;
  formats?: Formats.Formats;
};

/**
 * @param title: Tên của định dạng style, sẽ được hiển thị trong menu style.
 * @param inline__selector__block: Định nghĩa loại element mà định dạng style sẽ áp dụng. inline áp dụng cho các element inline như <span>, block áp dụng cho các element block như <div>, và selector cho phép bạn chọn một loại element cụ thể.
 * @param styles: Một đối tượng chứa các quy tắc CSS sẽ được áp dụng cho định dạng style. Mỗi key là tên của một thuộc tính CSS, và giá trị tương ứng là giá trị của thuộc tính đó.
 * @param classes: Một hoặc nhiều lớp CSS sẽ được thêm vào element khi định dạng style được áp dụng.
 * @param format: Tên của một định dạng style đã được định nghĩa trước. Khi bạn chọn một định dạng style có thuộc tính format trong menu style, TinyMCE sẽ áp dụng định dạng style đã được định nghĩa trước đó có tên tương ứng.
 */
type TStyleFormats = {
  title: string;
  inline?: string;
  block?: string;
  selector?: string;
  styles?: Record<string, string>;
  classes?: string;
  format?: string;
};

type FilePickerCallback = (
  callback: (value: string, meta?: Record<string, any>) => void,
  value: string,
  meta: Record<string, any>
) => void;

type TImageList = {
  title: string;
  value: string;
};

/**
 * @description Giá trị đầu ra
 */
type TOutputFormat = 'html' | 'text';

/**
 * @description Skin light và dark
 */
type TSkin = 'oxide-dark' | 'oxide';

/**
 * @description Loại file upload
 */
type TFilePickerTypes = 'file' | 'image' | 'media';

/**
 * @description Mode của content
 */
type TContentCss =
  | 'dark'
  | 'default'
  | 'document'
  | 'writer'
  | string
  | string[];

/**
 * @description Hiệu ứng của toolbar
 */
type TToolbarMode = 'floating' | 'sliding' | 'scrolling' | 'wrap';

/**
 * @description Thanh menu bar tương ứng với tên bên dưới
 */
type TMenubar =
  | 'file'
  | 'edit'
  | 'view'
  | 'insert'
  | 'format'
  | 'tools'
  | 'table'
  | 'help';

/**
 * @description Các plugins tương ứng với tên bên dưới
 */
type TPlugins =
  | 'preview'
  | 'importcss'
  | 'searchreplace'
  | 'autolink'
  | 'autosave'
  | 'save'
  | 'directionality'
  | 'code'
  | 'visualblocks'
  | 'visualchars'
  | 'fullscreen'
  | 'image'
  | 'link'
  | 'media'
  | 'template'
  | 'codesample'
  | 'table'
  | 'charmap'
  | 'pagebreak'
  | 'nonbreaking'
  | 'anchor'
  | 'insertdatetime'
  | 'advlist'
  | 'lists'
  | 'wordcount'
  | 'help'
  | 'quickbars'
  | 'emoticons';

/**
 * @description Các toolbar tương ứng với tên bên dưới
 */
type TToolbar =
  | 'undo redo'
  | 'bold italic underline strikethrough'
  | 'fontfamily fontsize blocks'
  | 'alignleft aligncenter alignright alignjustify'
  | 'outdent indent'
  | 'numlist bullist'
  | 'forecolor backcolor removeformat'
  | 'pagebreak'
  | 'charmap emoticons'
  | 'fullscreen  preview save print'
  | 'insertfile image media template link anchor codesample'
  | 'fontsizeinput'
  | 'ltr rtl'
  | 'code styles table';

export { TTinyMCE, TInit, TPlugins, TToolbar };
