import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BeforeSlideDetail } from 'lightgallery/lg-events';
import { LightGallerySettings } from 'lightgallery/lg-settings';
import { LightGallery } from 'lightgallery/lightgallery';
import lgAutoPlay from 'lightgallery/plugins/autoplay';
import lgFullScreen from 'lightgallery/plugins/fullscreen';
import lgPager from 'lightgallery/plugins/pager';
import lgRotate from 'lightgallery/plugins/rotate';
import lgShare from 'lightgallery/plugins/share';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { DEFAULT_LIGHT_GALLERY_CONFIG } from './light-gallery.variables';
const TIME_TO_DESTROY = 100;
@Component({
  selector: 'light-gallery',
  templateUrl: './light-gallery.component.html',
  styleUrls: ['./light-gallery.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LightGalleryComponent implements OnInit, OnDestroy, OnChanges {
  // Plugins
  @Input() hasZoom: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.hasZoom;
  @Input() hasThumbnail: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.hasThumbnail;
  @Input() hasAutoPlay: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.hasAutoPlay;
  @Input() hasRotate: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.hasRotate;
  @Input() hasShare: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.hasShare;
  @Input() hasPager: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.hasPager;
  @Input() hasFullScreen: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.hasFullScreen;
  // Core
  @Input() speed: number = DEFAULT_LIGHT_GALLERY_CONFIG.speed;
  @Input() mode: any = DEFAULT_LIGHT_GALLERY_CONFIG.mode;
  @Input() closable: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.closable;
  @Input() closeOnTap: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.closeOnTap;
  @Input() controls: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.controls;
  @Input() counter: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.counter;
  @Input() download: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.download;
  @Input() dynamic: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.dynamic;
  @Input() dynamicEl: any[] = DEFAULT_LIGHT_GALLERY_CONFIG.dynamicEl;
  @Input() easing: string = DEFAULT_LIGHT_GALLERY_CONFIG.easing;
  @Input() enableDrag: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.enableDrag;
  @Input() enableSwipe: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.enableSwipe;
  @Input() escKey: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.escKey;
  @Input() getCaptionFromTitleOrAlt: boolean =
    DEFAULT_LIGHT_GALLERY_CONFIG.getCaptionFromTitleOrAlt;
  @Input() hideBarsDelay: number = DEFAULT_LIGHT_GALLERY_CONFIG.hideBarsDelay;
  @Input() hideControlOnEnd: boolean =
    DEFAULT_LIGHT_GALLERY_CONFIG.hideControlOnEnd;
  @Input() hideScrollbar: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.hideScrollbar;
  @Input() index: number = DEFAULT_LIGHT_GALLERY_CONFIG.index;
  @Input() keyPress: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.keyPress;
  @Input() loop: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.loop;
  @Input() mousewheel: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.mousewheel;
  @Input() numberOfSlideItemsInDom: number =
    DEFAULT_LIGHT_GALLERY_CONFIG.numberOfSlideItemsInDom;
  @Input() preload: number = DEFAULT_LIGHT_GALLERY_CONFIG.preload;
  @Input() selector: string = DEFAULT_LIGHT_GALLERY_CONFIG.selector;
  @Input() showCloseIcon: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.showCloseIcon;
  @Input() slideDelay: number = DEFAULT_LIGHT_GALLERY_CONFIG.slideDelay;
  @Input() swipeToClose: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.swipeToClose;
  // Zoom plugin
  @Input() actualSize: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.actualSize;
  @Input() enableZoomAfter: number =
    DEFAULT_LIGHT_GALLERY_CONFIG.enableZoomAfter;
  @Input() scale: number = DEFAULT_LIGHT_GALLERY_CONFIG.scale;
  @Input() showZoomInOutIcons: boolean =
    DEFAULT_LIGHT_GALLERY_CONFIG.showZoomInOutIcons;
  @Input() zoom: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.zoom;
  @Input() zoomPluginStrings: any =
    DEFAULT_LIGHT_GALLERY_CONFIG.zoomPluginStrings;
  // Thumbnail plugin
  @Input() alignThumbnails: any = DEFAULT_LIGHT_GALLERY_CONFIG.alignThumbnails;
  @Input() enableThumbDrag: boolean =
    DEFAULT_LIGHT_GALLERY_CONFIG.enableThumbDrag;
  @Input() enableThumbSwipe: boolean =
    DEFAULT_LIGHT_GALLERY_CONFIG.enableThumbSwipe;
  // AutoPlay plugin
  @Input() autoplay: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.autoplay;
  @Input() autoplayControls: boolean =
    DEFAULT_LIGHT_GALLERY_CONFIG.autoplayControls;
  @Input() forceSlideShowAutoplay: boolean =
    DEFAULT_LIGHT_GALLERY_CONFIG.forceSlideShowAutoplay;
  @Input() progressBar: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.progressBar;
  @Input() slideShowAutoplay: boolean =
    DEFAULT_LIGHT_GALLERY_CONFIG.slideShowAutoplay;
  @Input() slideShowInterval: number =
    DEFAULT_LIGHT_GALLERY_CONFIG.slideShowInterval;
  // Rotate plugin
  @Input() flipHorizontal: boolean =
    DEFAULT_LIGHT_GALLERY_CONFIG.flipHorizontal;
  @Input() flipVertical: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.flipVertical;
  @Input() rotate: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.rotate;
  @Input() rotateLeft: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.rotateLeft;
  @Input() rotateRight: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.rotateRight;
  @Input() rotateSpeed: number = DEFAULT_LIGHT_GALLERY_CONFIG.rotateSpeed;
  // Share plugin
  @Input() share: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.share;
  @Input() sharePluginStrings: any =
    DEFAULT_LIGHT_GALLERY_CONFIG.sharePluginStrings;
  @Input() facebook: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.facebook;
  @Input() facebookDropdownText: string =
    DEFAULT_LIGHT_GALLERY_CONFIG.facebookDropdownText;
  @Input() pinterest: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.pinterest;
  @Input() pinterestDropdownText: string =
    DEFAULT_LIGHT_GALLERY_CONFIG.pinterestDropdownText;
  @Input() twitter: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.twitter;
  @Input() twitterDropdownText: string =
    DEFAULT_LIGHT_GALLERY_CONFIG.twitterDropdownText;
  // Pager plugin
  @Input() pager: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.pager;
  // FullScreen plugin
  @Input() fullScreen: boolean = DEFAULT_LIGHT_GALLERY_CONFIG.fullScreen;
  @Input() fullscreenPluginStrings: any =
    DEFAULT_LIGHT_GALLERY_CONFIG.fullscreenPluginStrings;
  // Nếu cần refresh
  @Input() needRefresh: boolean = false;

  // Emmiter khi thay đổi album
  @Output() lightGalleryInstance = new EventEmitter();
  // Emmiter khi cần cập nhật data
  @Output() needRefreshChange = new EventEmitter();
  // Emmiter khi thay đổi slide
  @Output() slideChange = new EventEmitter();

  // Lấy instance của light gallery
  private lightGallery!: LightGallery;
  // Check loading
  protected isLoadingAlbum = false;
  // Data được chọn trước đó
  protected selectedAlbum: any;
  // Danh sách albums của select
  protected selectData: any;
  // Cài đặt của light gallery
  protected settings: LightGallerySettings = {};
  // Thời gian cần refresh
  private timeOutId: any;

  constructor() {}

  // Lắng nghe sự kiện thay đổi
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.lightGallery) return;
    if (changes.hasOwnProperty('needRefresh')) {
      const { previousValue, currentValue } = changes['needRefresh'];
      if (currentValue || !previousValue === undefined) {
        // Kiểm tra nếu là dynamic thì refresh ngay lập tức không cần time to destroy vì đây là attr của settings nên không cần apply data-lg-id vào ảnh
        if (this.dynamic) {
          this.lightGallery.settings.dynamicEl = this.dynamicEl;
          this.lightGallery.refresh();
        }
        // Cần time to destroy để rendered ui apply bộ controls vào từng ảnh mà component này provider
        this.timeOutId = setTimeout(() => {
          this.lightGallery.refresh();
          this.needRefreshChange.emit(false);
        }, TIME_TO_DESTROY);
      }
    }
  }

  ngOnInit(): void {
    // Cấu hình các plugins cần dùng
    this.handleSetPlugins();
  }

  // Sau khi component unmount sẽ clean-up các sự kiện
  ngOnDestroy(): void {
    if (this.lightGallery) this.lightGallery.destroyModules();
    if (this.timeOutId) clearTimeout(this.timeOutId);
  }

  // Hàm khởi tạo của thư viện light gallery
  protected onInit = (detail:any): void => {
    this.lightGallery = detail.instance;
    this.lightGalleryInstance.emit(this.lightGallery);
  };

  // Xử lý điều kiện cần để thêm plugin vào danh sách các plugins cần dùng
  private handleSetPlugins(): void {
    // Filter lại các plugins cần dùng khi có option là true
    const plugins: any[] = [
      this.hasZoom && lgZoom,
      this.hasThumbnail && lgThumbnail,
      this.hasAutoPlay && lgAutoPlay,
      this.hasRotate && lgRotate,
      this.hasShare && lgShare,
      this.hasPager && lgPager,
      this.hasFullScreen && lgFullScreen,
    ].filter(Boolean);

    this.settings = {
      // Core
      counter: this.counter,
      speed: this.speed,
      mode: this.mode,
      closable: this.closable,
      closeOnTap: this.closeOnTap,
      controls: this.controls,
      download: this.download,
      dynamic: this.dynamic,
      easing: this.easing,
      enableDrag: this.enableDrag,
      enableSwipe: this.enableSwipe,
      escKey: this.escKey,
      getCaptionFromTitleOrAlt: this.getCaptionFromTitleOrAlt,
      hideBarsDelay: this.hideBarsDelay,
      hideControlOnEnd: this.hideControlOnEnd,
      hideScrollbar: this.hideScrollbar,
      index: this.index,
      keyPress: this.keyPress,
      loop: this.loop,
      mousewheel: this.mousewheel,
      numberOfSlideItemsInDom: this.numberOfSlideItemsInDom,
      preload: this.preload,
      selector: this.selector,
      showCloseIcon: this.showCloseIcon,
      slideDelay: this.slideDelay,
      swipeToClose: this.swipeToClose,
      // Zoom
      actualSize: this.actualSize,
      enableZoomAfter: this.enableZoomAfter,
      scale: this.scale,
      showZoomInOutIcons: this.showZoomInOutIcons,
      zoom: this.zoom,
      zoomPluginStrings: this.zoomPluginStrings,
      // Thumbnail
      alignThumbnails: this.alignThumbnails,
      enableThumbDrag: this.enableThumbDrag,
      enableThumbSwipe: this.enableThumbSwipe,
      // AutoPLay
      autoplay: this.autoplay,
      forceSlideShowAutoplay: this.forceSlideShowAutoplay,
      autoplayControls: this.autoplayControls,
      progressBar: this.progressBar,
      slideShowAutoplay: this.slideShowAutoplay,
      slideShowInterval: this.slideShowInterval,
      // Rotate
      flipHorizontal: this.flipHorizontal,
      flipVertical: this.flipVertical,
      rotate: this.rotate,
      rotateLeft: this.rotateLeft,
      rotateRight: this.rotateRight,
      rotateSpeed: this.rotateSpeed,
      // Share
      share: this.share,
      sharePluginStrings: this.sharePluginStrings,
      facebook: this.facebook,
      facebookDropdownText: this.facebookDropdownText,
      pinterest: this.pinterest,
      pinterestDropdownText: this.pinterestDropdownText,
      twitter: this.twitter,
      twitterDropdownText: this.twitterDropdownText,
      // Paper
      pager: this.pager,
      // FullScreen
      fullScreen: this.fullScreen,
      fullscreenPluginStrings: this.fullscreenPluginStrings,
      // Plugins cần dùng trong mảng danh sách
      plugins,
    };
    if (this.dynamic) {
      this.settings.dynamicEl =
        this.dynamicEl.length === 0
          ? DEFAULT_LIGHT_GALLERY_CONFIG.dynamicEl
          : this.dynamicEl;
    }
  }

  // Func được gọi khi trigger chuyển slides
  protected onBeforeSlide = (detail: BeforeSlideDetail): void => {
    this.slideChange.emit(detail);
  };
}
