import { FileUploadMultiComponent } from './file-upload-multi/file-upload-multi.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadSingleComponent } from './file-upload-single/file-upload-single.component';
import { TranslocoModule } from '@ngneat/transloco';
import { SmartAdminConfigService } from '../smart-admin-config.service';
import { Ng2FileUploadModule } from './ng2-file-upload/file-upload.module';
@NgModule({
  imports: [CommonModule, Ng2FileUploadModule, TranslocoModule],
  providers: [
    SmartAdminConfigService,
  ],
  declarations: [FileUploadSingleComponent, FileUploadMultiComponent],
  exports: [FileUploadSingleComponent, FileUploadMultiComponent, TranslocoModule],
})
export class FileUploadModule {}
