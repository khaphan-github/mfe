import { NgModule } from '@angular/core';
import { ImagesLazyloadDirective } from './images-lazyload.directive';

@NgModule({
  declarations: [ImagesLazyloadDirective],
  exports: [ImagesLazyloadDirective],
})
export class ImagesLazyloadModule {}
