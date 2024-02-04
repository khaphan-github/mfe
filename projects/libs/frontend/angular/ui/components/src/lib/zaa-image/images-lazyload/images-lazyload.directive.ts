import { Injector, Directive, ElementRef } from '@angular/core';
import { ImagesLazyloadService } from './images-lazyload.service';

@Directive({
  // Tận dụng thuộc tính "loading" làm directive selector
  selector: '[loading]',
})
export class ImagesLazyloadDirective {
  constructor(private injector: Injector, private el: ElementRef) {
    const img = this.el.nativeElement;

    // Nếu browser đã support thuộc tính "loading", chúng ta không cần phải làm gì thêm nữa, hãy để nó làm công việc của nó.
    // Tuy nhiên nếu element không phải là img (nó là background image), thì fallback về intersection observable
    if (
      'loading' in HTMLImageElement.prototype &&
      img.tagName.toLowerCase() === 'img'
    ) {
      img.src = img.dataset?.src;
    } else {
      // fallback sử dụng intersection observable API
      // IntersectionObserver là một API của trình duyệt được sử dụng để giám sát và phản ứng khi các phần tử DOM nằm trong viewport.
      const lazyService = this.injector.get(ImagesLazyloadService);
      lazyService.observe(img);
    }
  }
}
