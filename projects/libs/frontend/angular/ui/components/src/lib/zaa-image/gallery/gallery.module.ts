import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LightGalleryComponent } from './light-gallery/light-gallery.component';
import { LightgalleryModule } from 'lightgallery/angular';
import { FormsModule } from '@angular/forms';
import { ImagesLazyloadModule } from '../images-lazyload/images-lazyload.module';
import { SmartAdminConfigService } from '@shared/smart-admin-config.service';
@NgModule({
  imports: [
    CommonModule,
    LightgalleryModule,
    FormsModule,
    ImagesLazyloadModule,
  ],
  providers: [
    SmartAdminConfigService,
  ],
  declarations: [LightGalleryComponent],
  exports:[LightGalleryComponent]
})
export class GalleryModule { }
