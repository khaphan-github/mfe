/**
 *lg-slide: Chuyển đổi giữa các hình ảnh bằng hiệu ứng trượt (slide).
 *lg-fade: Chuyển đổi giữa các hình ảnh bằng hiệu ứng xuất hiện từ trong suốt (fade in).
 *lg-zoom-in: Chuyển đổi giữa các hình ảnh bằng hiệu ứng phóng to từ nhỏ lên.
 *lg-zoom-in-big: Chuyển đổi giữa các hình ảnh bằng hiệu ứng phóng to lớn lên.
 *lg-zoom-out: Chuyển đổi giữa các hình ảnh bằng hiệu ứng thu nhỏ ra.
 *lg-zoom-out-big: Chuyển đổi giữa các hình ảnh bằng hiệu ứng thu nhỏ lớn ra.
 *lg-zoom-out-in: Chuyển đổi giữa các hình ảnh bằng hiệu ứng thu nhỏ rồi phóng to.
 *lg-zoom-in-out: Chuyển đổi giữa các hình ảnh bằng hiệu ứng phóng to rồi thu nhỏ.
 *lg-soft-zoom: Chuyển đổi giữa các hình ảnh bằng hiệu ứng phóng to và thu nhỏ mềm mại.
 *lg-scale-up: Chuyển đổi giữa các hình ảnh bằng hiệu ứng mở rộng từ góc trái trên.
 */
enum Mode_Enum {
  lg_slide = 'lg-slide',
  lg_fade = 'lg-fade',
  lg_zoom_in = 'lg-zoom-in',
  lg_zoom_in_big = 'lg-zoom-in-big',
  lg_zoom_out = 'lg-zoom-out',
  lg_zoom_out_big = 'lg-zoom-out-big',
  lg_zoom_out_in = 'lg-zoom-out-in',
  lg_zoom_in_out = 'lg-zoom-in-out',
  lg_soft_zoom = 'lg-soft-zoom',
  lg_scale_up = 'lg-scale-up',
}

// Điều chỉnh hoạt ảnh
enum Easing_Enum {
  ease = 'ease',
  linear = 'linear',
  ease_in = 'ease-in',
  ease_out = 'ease-out',
  ease_in_out = 'ease-in-out',
}

// Điều chỉnh vị trí thumbnails
enum Align_Enum {
  left = 'left',
  middle = 'middle',
  right = 'right',
}

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
 * @param preload: Số lượng slide tải trước, vd: preload = 1 và khi đang ở slide 3 thì trang 2 và 4 sẽ được tải trước
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
 */

const DEFAULT_LIGHT_GALLERY_CONFIG = {
  // Plugins
  hasZoom: false,
  hasThumbnail: false,
  hasAutoPlay: false,
  hasRotate: false,
  hasShare: false,
  hasPager: false,
  hasFullScreen: false,
  // Core
  speed: 500,
  mode: Mode_Enum.lg_fade,
  closable: true,
  closeOnTap: true,
  controls: true,
  counter: false,
  download: false,
  dynamic: false,
  dynamicEl: [{ src: ' ', thumb: '', subHtml: '' }],
  easing: Easing_Enum.ease,
  enableDrag: true,
  enableSwipe: true,
  escKey: false,
  getCaptionFromTitleOrAlt: true,
  hideBarsDelay: 0,
  hideControlOnEnd: false,
  hideScrollbar: false,
  index: 0,
  keyPress: true,
  loop: true,
  mousewheel: false,
  numberOfSlideItemsInDom: 10,
  preload: 2,
  selector: '.item-image',
  showCloseIcon: true,
  slideDelay: 0,
  swipeToClose: true,
  // Zoom
  actualSize: false,
  enableZoomAfter: 300,
  scale: 1,
  showZoomInOutIcons: true,
  zoom: true,
  zoomPluginStrings: {
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    viewActualSize: 'View actual size',
  },
  // Thumbnail
  alignThumbnails: Align_Enum.middle,
  enableThumbDrag: true,
  enableThumbSwipe: true,
  // AutoPlay
  autoplay: true,
  autoplayControls: true,
  forceSlideShowAutoplay: false,
  progressBar: true,
  slideShowAutoplay: false,
  slideShowInterval: 2000,
  // Rotate
  flipHorizontal: true,
  flipVertical: true,
  rotate: true,
  rotateLeft: true,
  rotateRight: true,
  rotateSpeed: 400,
  // Share
  share: true,
  sharePluginStrings: { share: 'Share' },
  facebook: true,
  facebookDropdownText: 'Facebook',
  pinterest: true,
  pinterestDropdownText: 'Pinterest',
  twitter: true,
  twitterDropdownText: 'Twitter',
  // Pager
  pager: true,
  // FullScreen
  fullScreen: true,
  fullscreenPluginStrings: { toggleFullscreen: 'Toggle Fullscreen' },
};

export { DEFAULT_LIGHT_GALLERY_CONFIG };
