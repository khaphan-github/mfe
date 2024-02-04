import { FileUploadMultiComponent } from './file-upload-multi/file-upload-multi.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadSingleComponent } from './file-upload-single/file-upload-single.component';
import { Ng2FileUploadModule } from './ng2-file-upload';
import { SmartAdminConfigService } from '@shared/smart-admin-config.service';
import { TranslocoModule } from '@ngneat/transloco';
@NgModule({
  imports: [CommonModule, Ng2FileUploadModule, TranslocoModule],
  providers: [
    SmartAdminConfigService,
  ],
  declarations: [FileUploadSingleComponent, FileUploadMultiComponent],
  exports: [FileUploadSingleComponent, FileUploadMultiComponent, TranslocoModule],
})
export class FileUploadModule {}
