import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesLazyloadService {
  private observer!: IntersectionObserver;
  constructor() {
    this.init();
  }
  private init() {
    this.observer = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach((entry) => {
         // chưa đến viewport, dừng lại
        if (!entry.isIntersecting) return;

        // src được lưu trong data-src, chỉ cần copy nó vào src.
        const lazyImage = entry.target as HTMLImageElement;
        const src = lazyImage.dataset['src'];

        // safety, doesn't have data-src attribute, stop
        if (!src) return;

        // nếu ảnh là thẻ img, copy vào src
        // nếu ảnh là background image, copy vào background-image
        lazyImage.tagName.toLowerCase() === 'img'
          ? (lazyImage.src = src)
          : (lazyImage.style.backgroundImage = `url("${src}")`);

        // clean-up
        lazyImage.removeAttribute('lazy');
        imgObserver.unobserve(lazyImage);
      });
    });
  }

  observe(target: Element) {
    // chờ tấm ảnh scroll tới viewport
    this.observer.observe(target);
  }
}
