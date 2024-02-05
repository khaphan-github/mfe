import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FILE_UPLOAD_OPTIONS } from './const';
import { FileUploader } from 'projects/libs/frontend/angular/components/src/lib/zaa-file-upload/ng2-file-upload/file-uploader.class';
import { FileUploadModule, FileUploadMultiComponent, ToastrService } from '@erp/angular/components';
import { FileItem } from 'projects/libs/frontend/angular/components/src/lib/zaa-file-upload/ng2-file-upload/file-item.class';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  @ViewChild('uploadFileViewChild') uploadFileViewChild!: FileUploadMultiComponent;
  @Input() selectedItems: Array<any> = [];
  @Output() result = new EventEmitter<any>();
  @Output() invalid = new EventEmitter<boolean>();

  form!: FormGroup;
  formBuilder = inject(FormBuilder);
  toast = inject(ToastrService);

  // File upload region
  optionsFile = FILE_UPLOAD_OPTIONS;
  fileUploader!: FileUploader;

  ngOnInit(): void {
    this.invalid.emit(true);
    this.form = this.formBuilder.group({
      description: ['', Validators.required],
      fileDetails: [[], Validators.required]
    });

    this.form.valueChanges.subscribe({
      next: (value) => {
        this.invalid.emit(this.form.invalid);
        this.result.emit(value);
      },
    })
  }

  onChangeFile(file: FileItem): void {
    this.uploadFileViewChild.upload().subscribe({
      next: (value: any) => {
        const fileDetail = value.success.map((file: any) => {
          return {
            id: file.id,
            link: file.link,
            file_name: file.file_name
          }
        });

        this.form.get('fileDetails')?.setValue([...this.form.get('fileDetails')?.getRawValue(), ...fileDetail])
      },
      error: (err: any) => {
        this.toast.error(`Lỗi tải file, vui lòng thử lại!`);
      },
    })
  }
}
