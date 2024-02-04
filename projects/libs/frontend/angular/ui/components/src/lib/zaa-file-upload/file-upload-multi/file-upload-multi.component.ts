import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LocalStorageConfigKeys } from '@config/app-storage/local-storage.config';
import { CoreLocalStorageService } from '@core/app-store/local-storage/local-storage.service';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from '@shared/components/lib-ngx/ngx-toastr/toastr/toastr.service';
import _ from 'lodash';
import { Observable, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { FileUploadService } from '../file-upload.service';
import { FileItem, FileUploader } from '../ng2-file-upload';
import {
  IFileUploadMultiOption,
  IParamUploadMultiFile,
  IValueOutputFileUpload,
} from './file-upload-multi.type';

@Component({
  selector: 'file-upload-multi',
  templateUrl: './file-upload-multi.component.html',
  styleUrls: ['./file-upload-multi.component.css'],
})
export class FileUploadMultiComponent implements OnInit {
  pathKeyNgonNgu: string = "shared.components.file_upload."
  /*
  kết quả trả về
  */
  private _resultUpload: IValueOutputFileUpload = {
    success: [],
    error: [],
  };
  /**
   * trạng thái api delete đã chạy hay chưa
   * --> true -> chạy api delete rồi
   * --> false -> chưa chạy api delete
   */
  private _statusDelete = true;
  /*
  đối tượng thiết lập cho module upload
  */
  protected _uploader: any = new FileUploader({ url: '' });
  /*
    tạo loading
    */
  private loaded = false;

  /*
    cấu hình upload
    */
  private _option!: IFileUploadMultiOption | any;
  private _params!: IParamUploadMultiFile | any;
  /*
  danh sách file đã upload
  */
  protected _uploadedFiles!: any[];
  /*
  thiết lập mặc định option
  */
  private _defaultOption: IFileUploadMultiOption | any = {
    allowedType: [],
    auto: false,
    fileView: 'list',
    allowDelete: true,
    sizeCheck: 0,
    lockUpload: false,
    urlFile: 'http://localhost:5000',
    isShowPicture: false,
    isHidden: false,
    headers: [],
    authToken: `Bearer ${this.coreLocalStorageService.getItem(LocalStorageConfigKeys.feature.auth.accessToken)}`,
    itemAlias: "files",
    removeAfterUpload: true
  };

  private _fileMapping: any = {
    jpeg: 'fal fa-file-image fa-2x',
    png: 'fal fa-file-image fa-2x',
    jpg: 'fal fa-file-image fa-2x',
    rar: 'fal fa-file-archive fa-2x',
    zip: 'fal fa-file-archive fa-2x',
    '7z': 'fal fa-file-archive fa-2x',
    xls: 'fal fa-file-excel fa-2x',
    xlsx: 'fal fa-file-excel fa-2x',
    pdf: 'fal fa-file-pdf fa-2x',
    doc: 'fal fa-file-word fa-2x',
    docx: 'fal fa-file-word fa-2x',
    txt: 'fal fa-file-edit fa-2x',
    odt: 'fal fa-file-edit fa-2x',
    ppt: 'fal fa-file-powerpoint fa-2x',
    pptx: 'fal fa-file-powerpoint fa-2x',
  };

  /*-----------------------------------ELEMENTS SCOPE-----------------------------------*/

  @ViewChild('uploadEl') uploadEl!: ElementRef<HTMLInputElement>;

  /*-----------------------------------COMPONENT INTERACTION SCOPE-----------------------------------*/
  /*
 tự thiết lập cấu hình upload file (thiết lập ngoài component)
 _options không có truyền thuộc tính tương ứng _defaultOption sẽ thay thế bằng thuộc tính của _defaultOption
 */
  @Input()
  public get option() {
    return this._option;
  }
  public set option(value) {
    if (value === undefined) {
      console.error('option khổng thể undefined');
      throw new Error('option khổng thể undefined');
    }

    this._option = value;

    /*
  có 1 thuộc tính trong option ko có thì set thành tham số mặc định
  */
    for (let k in this._defaultOption) {
      if (this._option[k] == undefined || this._option[k] == null) {
        this._option[k] = this._defaultOption[k];
      }
    }
  }

  /*
  dữ liệu thao tác Input() component
  */

  @Input()
  public get params() {
    return this._params;
  }

  public set params(value: IParamUploadMultiFile) {
    if (value === undefined) {
      console.error('params không được để trống');
      throw new Error('params không được để trống');
    }
    this._params = value;
    if (value.fileId) {
      this.getFiles();
    }
    for (let k in this.defaultParamsUpload) {
      if (!this._params[k]) {
        this._params[k] = this.defaultParamsUpload[k];
      }
    }
    this._uploader.options.additionalParameter = this.params;
  }

  /*
  Ouput:
      Upload File: sử dụng để biết thay đổi ko
  */
  @Output() onChangeFile = new EventEmitter();
  /**
   * Output xóa item
   */
  @Output() onDeleteSuccess = new EventEmitter();
  @Output() onInitUploader: EventEmitter<FileUploader> = new EventEmitter<FileUploader>();
  @Output() onUploadSuccess: EventEmitter<IValueOutputFileUpload> = new EventEmitter<IValueOutputFileUpload>();
  private defaultParamsUpload: IParamUploadMultiFile | any = {
    fileId: [],
    fileName: '',
    fileSize: 0,
    uploadPath: '',
  };

  /*-----------------------------------LIFECYCLE HOOKS SCOPE-----------------------------------*/

  constructor(
    private fileUploadService: FileUploadService,
    private coreLocalStorageService: CoreLocalStorageService,
    private toast: ToastrService,
    private translocoService: TranslocoService
  ) { }

  ngOnInit() {
    this._uploadedFiles = [];
    /*
    thiết lập mặc định nếu như ko tự thiết lập
    */
    if (!this.option) {
      this.option = this._defaultOption;
    }
    this.setUp();
    this.onInitUploader.emit(this._uploader);
  }

  /*-----------------------------------GETTER/SETTER SCOPE-----------------------------------*/
  /*
  files chuẩn bị upload
  */
  public get files(): FileItem[] {
    return this._uploader.queue;
  }
  /*
  thông báo cho phép file nào được sử dụng
  */
  protected get messageAllowType() {
    if (this.option.allowedType?.length === 0) {
      return '';
    } else {
      return this.option.allowedType?.join(', ');
    }
  }
  /*
  kiểm tra có file nào đang hàng chờ upload file ko
  */
  public get isQueingFile(): boolean {
    if (this.files.length > 0) {
      return true;
    }
    return false;
  }

  /*-----------------------------------SETUP SCOPE-----------------------------------*/

  setUp() {
    this._uploader.setOptions({
      url: `${this.option.urlFile}`,
      removeAfterUpload: this.option.removeAfterUpload,
      itemAlias: this.option.itemAlias,
      autoUpload: this.option.auto,
      additionalParameter: this.params,
      authToken: this.option.authToken,
      headers: this.option.headers,
    });

    this._uploader.onAfterAddingFile = (fileItem: any) => {
      let isCheckError = false;
      const fileType = fileItem.file.name?.substring(
        fileItem.file.name.lastIndexOf('.') + 1,
        fileItem.file.name.length
      );

      if (this.option.sizeCheck) {
        if (
          Math.round(fileItem.file.size) / 1024 / 1024 >
          this.option.sizeCheck
        ) {
          this.toast.error(
            this.translocoService.translate(this.pathKeyNgonNgu + "loi_vuot_dung_luong") + `${this.option.sizeCheck} MB`,
            this.translocoService.translate(this.pathKeyNgonNgu + "loi_tieu_de"),
          );
          this.uploadEl.nativeElement.value = '';
          isCheckError = true;
        }
      }

      if ((this.option.allowedType ?? []).length > 0 && !isCheckError) {
        if (
          (this.option.allowedType ?? []).findIndex(
            (x: any) => x.toLowerCase() == fileType?.toLowerCase()
          ) < 0
        ) {
          this.toast.error(
            this.translocoService.translate(this.pathKeyNgonNgu + "loi_khong_dung_dinh_dang") + ` ${this.messageAllowType}`,
            this.translocoService.translate(this.pathKeyNgonNgu + "loi_tieu_de"),
          );
          this.uploadEl.nativeElement.value = '';
          isCheckError = true;
        }
      }

      this._uploader.onSuccessItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: {
          [headerFieldName: string]: string;
        }
      ) => {
        const result: any = JSON.parse(response);
        if (result) {
          result.cssClassFileIcon = this.getCLassFileIcon(result.type ?? "");
          this._uploadedFiles.push(result);
          this._resultUpload.success.push({
            file: item.file,
            ...result,
          });
          this.onUploadSuccess.emit({
            file: item.file,
            ...result,
          })
        }
      };
      this._uploader.onErrorItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: {
          [headerFieldName: string]: string;
        }
      ) => {
        this.toast.error(
          this.translocoService.translate(this.pathKeyNgonNgu + "upload_that_bai"),
        )
        this._resultUpload.error.push({ name: response });
      };
      fileItem.withCredentials = false;
      // this.uploadEl.nativeElement.value = '';

      fileItem['cssClassFileIcon'] = this.getCLassFileIcon(fileType ?? '');

      if (isCheckError) {
        this.deleteFileInQue(fileItem);
      } else {
        fileItem.file.name = this.removeDiacritics(fileItem.file.name??'');
        this.onChangeFile.emit(fileItem);
      }
    };
  }

  removeDiacritics(str: string) {
    const partern = /[\u0300-\u036f]/g;
    return str.normalize('NFD').replace(partern, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'D').toLowerCase();
  }

  /*-----------------------------------UPLOAD SCOPE-----------------------------------*/

  upload(): Observable<IValueOutputFileUpload> {
    if (!this.option.auto) {
      this._resultUpload = {
        error: [],
        success: [],
      };
    }

    return new Observable((observer) => {
      if (this.option.lockUpload) {
        observer.next(this._resultUpload);
        observer.complete();
      }
      if (!this.isQueingFile && !this.option.auto) {
        observer.next(this._resultUpload);
        observer.complete();
      }
      if (this.option.auto) {
        observer.next(this._resultUpload);
        observer.complete();
      }

      this._uploader.uploadAll();

      this._uploader.onSuccessItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: {
          [headerFieldName: string]: string;
        }
      ) => {
        const result: any = JSON.parse(response);
        if (result) {
          result.cssClassFileIcon = this.getCLassFileIcon(result.type);
          this._uploadedFiles.push(result);
          this._resultUpload.success.push({
            file: item.file,
            ...result,
          });
        }
      };

      this._uploader.onErrorItem = (
        item: FileItem,
        response: string,
        status: number,
        headers: {
          [headerFieldName: string]: string;
        }
      ) => {
        this.toast.error(
          this.translocoService.translate(this.pathKeyNgonNgu + "upload_that_bai"),
        )
        this._resultUpload.error.push({ name: response });
      };

      this._uploader.onCompleteAll = () => {
        // this.getFiles();
        observer.next(this._resultUpload);
        observer.complete();
      };
    });
  }

  /*-----------------------------------API SCOPE-----------------------------------*/

  getFiles() {
    this._uploadedFiles = [];
    this.fileUploadService
      .getUploadList(this.params.fileId)
      .subscribe((res) => {
        this._uploadedFiles = res;
        this._uploadedFiles.forEach((x) => {
          x['cssClassFileIcon'] = this.getCLassFileIcon(x.type);
        });
      });
  }

  handleDeletOne(file: any) {
    console.log('file: ', file);
    let isCheckError = true;
    if (!file) return;
    const { id } = file;
    Swal.fire({
      title: 'Do you want to delete file?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.fileUploadService.deleteFile(id).subscribe({
          next: (res) => {
            isCheckError = false;
            _.remove(this.params.fileId ?? [], (current) => {
              return current === file.id;
            });
            _.remove(this._uploadedFiles, (current) => {
              return current.id === id;
            });
            this.onDeleteSuccess.emit([id]);
          },
          complete: () => {
            if (isCheckError) {
              this.toast.error(
                this.translocoService.translate(this.pathKeyNgonNgu + "xoa_that_bai"),
              )
            } else {
              this.toast.error(
                this.translocoService.translate(this.pathKeyNgonNgu + "xoa_thanh_cong"),
              )
            }
          },
        });
      }
    });
  }

  handleDeleteAll() {
    let isCheckError = true;
    Swal.fire({
      title: 'Do you want to delete all file?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const deletObservables = this._uploadedFiles.map((item) => {
          return this.fileUploadService.deleteFile(item.id);
        });
        forkJoin(deletObservables).subscribe({
          next: (res) => {
            isCheckError = false;
            this.onDeleteSuccess.emit(this._uploadedFiles.map((item) => item));
            this._uploadedFiles = [];
            this.params.fileId = [];
          },
          complete: () => {
            if (isCheckError) {
              this.toast.error(this.translocoService.translate(this.pathKeyNgonNgu + 'xoa_that_bai'))
            } else {
              this.toast.success(this.translocoService.translate(this.pathKeyNgonNgu + 'xoa_thanh_cong'))
            }
          },
        });
      }
    });
  }

  handleDeleteFileMemoryLeak(id: string[]) {
    const deletObservables = id.map((item) => {
      return this.fileUploadService.deleteFile(item);
    });
    forkJoin(deletObservables).subscribe({
      complete: () => {
        this._uploadedFiles = this._uploadedFiles.filter(
          (item) => !id.includes(item.id)
        );
      },
    });
  }

  /*-----------------------------------HANDLE SCOPE-----------------------------------*/

  /*
  lấy ra icon theo loại file
  */
  private getCLassFileIcon(fileType: string): string {
    if (fileType) {
      let classFile = this._fileMapping[fileType.toLowerCase()];
      if (!classFile) {
        return 'fal fa-file fa-2x';
      }
      return classFile;
    } else
      return "";
  }

  /*
  delete file trong hàng đợi
  */
  deleteFileInQue = (file: any) => {
    this.files.forEach((x) => {
      if (x.file.name == file.file.name) {
        x.remove();
      }
    });
  };

  openFileInput() {
    this.uploadEl.nativeElement.click();
  }
}
