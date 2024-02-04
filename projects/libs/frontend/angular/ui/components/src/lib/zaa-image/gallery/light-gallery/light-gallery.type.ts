import { LgQuery } from 'lightgallery/lgQuery';
import { LightGallery } from 'lightgallery/lightgallery';
/**
 * @param hasZoom: Plugin cho phép phóng to và thu nhỏ ảnh trong lightgallery
 * @param hasThumbnail: Plugin này cho phép hiển thị các hình ảnh thu nhỏ bên dưới lightgallery để dễ dàng chuyển đổi giữa các ảnh
 * @param hasAutoPlay: Plugin này tự động chuyển đổi giữa các ảnh trong lightgallery
 * @param hasRotate: Plugin này cho phép xoay ảnh
 * @param hasShare: Plugin này cho phép chia sẻ ảnh qua các nền tảng mạng xã hội khác nhau
 * @param hasPager: Plugin này cho phép hiển thị thanh trượt phân trang để dễ dàng chuyển đổi giữa các ảnh
 * @param hasFullScreen: Plugin này cho phép bật chế độ toàn màn hình để xem ảnh
 * @param speed: Tốc độ chuyển slide
 * @param mode: Chế độ hiệu ứng chuyển đổi giữa các hình ảnh
 * @param closable: Cho phép đóng hình ảnh khi click bên ngoài
 * @param closeOnTap: Nhấp vào vùng màu đen để đóng thư viện
 * @param controls: Hiển thị các nút trước/tiếp theo
 * @param counter: Hiển thị tổng số ảnh
 * @param download: Cho phép tải ảnh
 * @param dynamic: Cho phép dùng ảnh theo src
 * @param dynamicEl: Chứa các ảnh từ src không cần render bên ui
 * @param easing: Thuộc tính CSS hoạt ảnh trượt
 * @param enableDrag: Bật hỗ trợ kéo chuột cho pc
 * @param enableSwipe: Bật hỗ trợ vuốt cho thiết bị cảm ứng
 * @param escKey: Có thể đóng LightGallery bằng cách nhấn phím "Esc" hay không.
 * @param getCaptionFromTitleOrAlt: Tùy chọn để nhận chú thích từ thẻ alt hoặc thẻ tiêu đề
 * @param hideBarsDelay: Độ trễ để ẩn các điều khiển thư viện tính bằng ms
 * @param hideControlOnEnd: Nút trước/tiếp theo sẽ bị ẩn trên hình ảnh đầu tiên/cuối cùng. Lưu ý - tùy chọn này sẽ bị bỏ qua nếu vòng lặp hoặc slideEndAnimation được đặt thành true
 * @param hideScrollbar: Ẩn thanh cuộn khi thư viện được mở
 * @param index: Chỉ định slide nào sẽ tải ban đầu
 * @param keyPress: Cho phép nhấn để chuyển slide
 * @param loop: Cho phép lặp lại slide vô hạn
 * @param mousewheel: Khả năng điều hướng đến các slide tiếp theo/trước trên con lăn chuột
 * @param numberOfSlideItemsInDom: Kiểm soát số lượng mục slide nên được giữ trong dom tại một thời điểm
 * @param selector: Selector đến thẻ a cần sử dụng bộ control
 * @param preload: số lượng slide tải trước, vd: preload = 1 và khi đang ở slide 3 thì trang 2 và 4 sẽ được tải trước
 * @param showCloseIcon: Hiển thị nút đóng galleries
 * @param slideDelay: Trì hoãn chuyển tiếp slide
 * @param swipeToClose: Vuốt dọc để đóng, nếu closeable là false thì cái này cũng false
 * @param actualSize: Kích hoạt biểu tượng kích thước thực tế
 * @param enableZoomAfter: Sau khi quá trình chuyển đổi trang chiếu hoàn tất, plugin thu phóng sẽ mất bao nhiêu thời gian để kích hoạt
 * @param scale: Giá trị của zoom nên được tăng/giảm
 * @param showZoomInOutIcons: Hiển thị biểu tượng phóng to, thu nhỏ
 * @param zoom: Bật/Tắt tùy chọn thu phóng
 * @param zoomPluginStrings: Chuỗi dịch tùy chỉnh cho nhãn aria
 * @param alignThumbnails: Vị trí của hình thu nhỏ
 * @param enableThumbDrag: Bật hỗ trợ chuyển slide khi nhấn vào thumbnail ở pc
 * @param enableThumbSwipe: Bật hỗ trợ chuyển slide khi nhấn vào thumbnail ở thiết bị cảm ứng
 * @param autoplay: Bật plugin tự động phát
 * @param autoplayControls: Hiển thị/ẩn các điều khiển tự động phát
 * @param forceSlideShowAutoplay: Nếu tự false sẽ bị dừng sau hành động đầu tiên của người dùng
 * @param progressBar: Hiển thị thanh tiến trình tự động phát
 * @param slideShowAutoplay: Bật tự động phát trình chiếu
 * @param slideShowInterval: Thời gian (tính bằng mili giây) giữa mỗi lần chuyển tiếp tự động
 * @param flipHorizontal: Bật lật ngang
 * @param flipVertical: Bật lật dọc
 * @param rotate: Bật/Tắt tùy chọn xoay
 * @param rotateLeft: Bật xoay trái
 * @param rotateRight: Bật xoay phải
 * @param rotateSpeed: Tốc độ quay tính bằng mili giây
 * @param share: Bật/Tắt tùy chọn chia sẻ
 * @param sharePluginStrings: Chuỗi dịch tùy chỉnh cho nhãn aria
 * @param facebook: Kích hoạt tính năng chia sẻ Facebook
 * @param facebookDropdownText: Văn bản thả xuống Facebook
 * @param pinterest: Kích hoạt tính năng chia sẻ pinterest
 * @param pinterestDropdownText: Văn bản thả xuống pinterest
 * @param twitter: Kích hoạt tính năng chia sẻ twitter
 * @param twitterDropdownText: Văn bản thả xuống twitter
 * @param pager: Bật/Tắt tùy chọn phân trang
 * @param fullScreen: Bật/Tắt tùy chọn toàn màn hình
 * @param fullscreenPluginStrings: Chuỗi dịch tùy chỉnh cho nhãn aria
 * @param plugins: Các plugins
 */

type LightGallery_Type = {
  // Plugins
  hasZoom?: boolean;
  hasThumbnail?: boolean;
  hasAutoPlay?: boolean;
  hasRotate?: boolean;
  hasShare?: boolean;
  hasPager?: boolean;
  hasFullScreen?: boolean;
  // Core
  speed?: number;
  mode?: Mode_Type;
  closable?: boolean;
  closeOnTap?: boolean;
  controls?: boolean;
  counter?: boolean;
  download?: boolean;
  dynamic?: boolean;
  dynamicEl?: DynamicEl_Type[];
  easing?: string;
  enableDrag?: boolean;
  enableSwipe?: boolean;
  escKey?: boolean;
  getCaptionFromTitleOrAlt?: boolean;
  hideBarsDelay?: number;
  hideControlOnEnd?: boolean;
  hideScrollbar?: boolean;
  index?: number;
  keyPress?: boolean;
  loop?: boolean;
  mousewheel?: boolean;
  numberOfSlideItemsInDom?: number;
  selector?: string;
  preload?: number;
  showCloseIcon?: boolean;
  slideDelay?: number;
  swipeToClose?: boolean;
  //Zoom
  actualSize?: boolean;
  enableZoomAfter?: number;
  scale?: number;
  showZoomInOutIcons?: boolean;
  zoom?: boolean;
  zoomPluginStrings?: ZoomPluginStrings_Type;
  // Thumbnail
  alignThumbnails?: AlignThumbnails_Type;
  enableThumbDrag?: boolean;
  enableThumbSwipe?: boolean;
  // AutoPlay
  autoplay?: boolean;
  autoplayControls?: boolean;
  forceSlideShowAutoplay?: boolean;
  progressBar?: boolean;
  slideShowAutoplay?: boolean;
  slideShowInterval?: number;
  // Rotate
  flipHorizontal?: boolean;
  flipVertical?: boolean;
  rotate?: boolean;
  rotateLeft?: boolean;
  rotateRight?: boolean;
  rotateSpeed?: number;
  // Share
  share?: boolean;
  sharePluginStrings?: SharePluginStrings_Type;
  facebook?: boolean;
  facebookDropdownText?: string;
  pinterest?: boolean;
  pinterestDropdownText?: string;
  twitter?: boolean;
  twitterDropdownText?: string;
  // Pager
  pager?: boolean;
  //FullScreen
  fullScreen?: boolean;
  fullscreenPluginStrings?: FullScreenPluginStrings_Type;
  // Plugins
  plugins?: (new (instance: LightGallery, $LG: LgQuery) => any)[];
};

type Mode_Type =
  | 'lg-slide'
  | 'lg-fade'
  | 'lg-zoom-in'
  | 'lg-zoom-in-big'
  | 'lg-zoom-out'
  | 'lg-zoom-out-big'
  | 'lg-zoom-out-in'
  | 'lg-zoom-in-out'
  | 'lg-soft-zoom'
  | 'lg-scale-up'
  | 'lg-slide-circular'
  | 'lg-slide-circular-vertical'
  | 'lg-slide-vertical'
  | 'lg-slide-vertical-growth'
  | 'lg-slide-skew-only'
  | 'lg-slide-skew-only-rev'
  | 'lg-slide-skew-only-y'
  | 'lg-slide-skew-only-y-rev'
  | 'lg-slide-skew'
  | 'lg-slide-skew-rev'
  | 'lg-slide-skew-cross'
  | 'lg-slide-skew-cross-rev'
  | 'lg-slide-skew-ver'
  | 'lg-slide-skew-ver-rev'
  | 'lg-slide-skew-ver-cross'
  | 'lg-slide-skew-ver-cross-rev'
  | 'lg-lollipop'
  | 'lg-lollipop-rev'
  | 'lg-rotate'
  | 'lg-rotate-rev'
  | 'lg-tube';

type AlignThumbnails_Type = 'left' | 'middle' | 'right' | undefined;

type ZoomPluginStrings_Type = {
  zoomIn: string;
  zoomOut: string;
  viewActualSize: string;
};

type SharePluginStrings_Type = {
  share: string;
};

type FullScreenPluginStrings_Type = {
  toggleFullscreen: string;
};

type DynamicEl_Type = {
  src: string;
  thumb: string;
  subHtml?: string;
};

export { LightGallery_Type };
