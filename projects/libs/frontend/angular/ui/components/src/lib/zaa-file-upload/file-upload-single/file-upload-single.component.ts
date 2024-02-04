import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CoreLocalStorageService } from '@core/app-store/local-storage/local-storage.service';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from '@shared/components/lib-ngx/ngx-toastr/toastr/toastr.service';
import { Observable } from 'rxjs';
import { LocalStorageConfigKeys } from 'src/app/config/app-storage/local-storage.config';
import Swal from 'sweetalert2';
import { FileUploadService } from '../file-upload.service';
import { FileItem, FileUploader } from '../ng2-file-upload';
import {
  IFileUploadSingleOption,
  IParamUploadSingleFile,
  IPayloadUpload,
  IValueOutputFileUpload,
} from './file-upload-single.type';

@Component({
  selector: 'file-upload-single',
  templateUrl: './file-upload-single.component.html',
  styleUrls: ['./file-upload-single.component.css'],
})
export class FileUploadSingleComponent implements OnInit {
  pathKeyNgonNgu: string = "shared.components.file_upload."

  // radio button
  // 1 -> upload file từ máy tính
  // 2 -> chép link ngoài
  // */
  protected _btn: any = {
    '1': { checked: false, header: this.translocoService.translate(this.pathKeyNgonNgu + "upload_file") },
    '2': { checked: false, header: this.translocoService.translate(this.pathKeyNgonNgu + "chep_link") },
  };
  /*
    tạo loading
    */
  private loaded = false;
  /*
    đối tượng thiết lập cho module upload
    */
  protected _uploader = new FileUploader({
    url: '',
  });

  protected fileUploaded: any;
  /*
    cấu hình upload
    */
  private _option!: IFileUploadSingleOption | any;
  /*
    thiết lập mặc định option
    */
  private _defaultOption: IFileUploadSingleOption | any = {
    allowedType: [],
    auto: false,
    fileView: 'list',
    allowDelete: true,
    choices: [1],
    activeChoice: 1,
    thumb: false,
    sizeCheck: 0,
    urlFile: 'UrlVariable.URL_FILES',
    is_allow_upload: true,
    name: 'SingleUploadName',
    isHidden: false,
    headers: [],
    authToken: `Bearer ${this.coreLocalStorageService.getItem(LocalStorageConfigKeys.feature.auth.accessToken)}`,
    itemAlias: "files",
    removeAfterUpload: true
  };
  /*
    dữ liệu thao tác Input() component
    */
  private _params!: IParamUploadSingleFile | any;

  private defaultParamsUpload: IParamUploadSingleFile | any = {
    fileId: '',
    fileName: '',
    fileSize: 0,
    allow_delete_old: true,
    fileLink: '',
    uploadPath: '',
  };


  private payload: IPayloadUpload = {
    type: '',
    ext: '',
  };

  /*-----------------------------------ELEMENTS SCOPE-----------------------------------*/

  @ViewChild('uploadEl') uploadEl!: ElementRef<HTMLInputElement>;
  @ViewChild('dataFile') dataFile!: ElementRef<HTMLInputElement>;

  /*-----------------------------------COMPONENT INTERACTION SCOPE-----------------------------------*/

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

    for (let k in this._defaultOption) {
      if (this._option[k] == null || this._option[k] == undefined) {
        this._option[k] = this._defaultOption[k];
      }
    }
  }

  @Input()
  public get params() {
    return this._params;
  }

  public set params(value: IParamUploadSingleFile) {
    if (!value) return;
    this._params = value;
    for (let k in this.defaultParamsUpload) {
      if (this._params[k] == null || this._params[k] == undefined) {
        this._params[k] = this.defaultParamsUpload[k];
      }
    }
    this.handlePayload({ ...this._params });
    if (this.params.fileId) {
      this.getFileUploaded(this.params.fileId);
    }
  }

  /*
    Ouput:
        Chép link: two way binding link file
        Upload File: sử dụng để biết thay đổi ko
    */
  @Output() onChangeFile = new EventEmitter();
  @Output() onDeleteFile = new EventEmitter();
  @Output() onInitUploader: EventEmitter<FileUploader> = new EventEmitter<FileUploader>();
  @Output() onUploadSuccess: EventEmitter<IValueOutputFileUpload> = new EventEmitter<IValueOutputFileUpload>();

  /*-----------------------------------LIFECYCLE HOOKS SCOPE-----------------------------------*/

  constructor(
    private fileUploadService: FileUploadService,
    private coreLocalStorageService: CoreLocalStorageService,
    public translocoService: TranslocoService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    /*
    thiết lập mặc định nếu như ko tự thiết lập
    */
    if (!this.option) {
      this.option = this._defaultOption;
    }
    this.params = this.defaultParamsUpload;
    this.checkChoice();
    this.onInitUploader.emit(this._uploader);
  }

  /*-----------------------------------GETTER/SETTER SCOPE-----------------------------------*/

  get files(): FileItem[] {
    return this._uploader.queue;
  }
  /*
    lấy ra thuộc tính dối tượng btn toggle (_btn)
    */
  protected get keysToggleBtn() {
    return Object.keys(this._btn);
  }

  protected get messageAllowType() {
    if (this.option.allowedType?.length === 0) {
      return '';
    } else {
      return this.option.allowedType?.join(', ');
    }
  }

  /*-----------------------------------SETUP SCOPE-----------------------------------*/

  private checkChoice() {
    if (this.option.choices.length > 0) {
      let index = 0;
      this.keysToggleBtn.forEach((x) => {
        index = this.option.choices.findIndex((k: any) => +x === +k);
        if (index < 0) {
          delete this._btn[x];
        }
      });
    }
    if (this.option.choices.length === 1) {
      this.option.activeChoice = this.option.choices[0];
    }

    if (this.params.fileId) {
      if (this.params.fileLink) {
        this._btn[2].checked = true;
        this.option.activeChoice = 2;
      } else {
        this._btn[1].checked = true;
        this.option.activeChoice = 1;
      }
    } else {
      /*
      cho btn=true khi = activeChoice
      */
      this.keysToggleBtn.forEach((x) => {
        if (+x == this.option.activeChoice) {
          this._btn[x].checked = true;
        }
      });
    }

    if (this._btn[1] && this._btn[1].checked) {
      this.loaded = true;
      this.setUp();
    }
    if (this._btn[2] && this._btn[2].checked) {
      this.loaded = true;
    }
  }

  private setUp() {
    this._uploader.setOptions({
      url: `${this.option.urlFile}`,
      removeAfterUpload: this.option.removeAfterUpload,
      itemAlias: this.option.itemAlias,
      autoUpload: this.option.auto,
      additionalParameter: this.payload,
      authToken: this.option.authToken,
      headers: this.option.headers,
    });

    this._uploader.onAfterAddingFile = (fileItem) => {
      let isCheckError = false;
      let fileType = fileItem.file.name?.substr(
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
      if (
        (this.option.allowedType ?? [])?.length > 0 &&
        isCheckError === false
      ) {
        if (
          (this.option.allowedType ?? [])?.findIndex(
            (x: any) => x.toLocaleLowerCase() === fileType?.toLocaleLowerCase()
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

      fileItem.withCredentials = false;

      if (isCheckError) {
        this.deleteFileInQue(fileItem);
      } else {
        const type = fileItem.file.type?.startsWith('image/') ? 'image' : 'file';
        const ext = fileType
        this.handlePayload({ ext, type });
        fileItem.file.name = this.removeDiacritics(fileItem.file.name??'');
        this.onChangeFile.emit(fileItem);
      }
    };
    this._uploader.onSuccessItem = (
      item: FileItem,
      res: string,
      status: number,
      headers: { [headerFieldName: string]: string }
    ) => {
      this.toast.success(
        this.translocoService.translate(this.pathKeyNgonNgu + "upload_thanh_cong"),
      );
      const result = JSON.parse(res);
      const { file_hash: id, file_name: name, file_size: size, file_url: path } = result._value.files[0];
      this.createFileUploaded(id, name, path, size, '');
      this.onUploadSuccess.emit(result)
    };
    this._uploader.onErrorItem = (item: FileItem, res: string) => {
      this.toast.error(
        this.translocoService.translate(this.pathKeyNgonNgu + "upload_that_bai"),
      )
    };
  }

  removeDiacritics(str: string) {
    const partern = /[\u0300-\u036f]/g;
    return str.normalize('NFD').replace(partern, '')
              .replace(/đ/g, 'd')
              .replace(/Đ/g, 'D').toLowerCase();
  }

  /*-----------------------------------UPLOAD SCOPE-----------------------------------*/

  upload(): Observable<IValueOutputFileUpload | any> {
    return new Observable((observer) => {
      if (this.files.length === 0 && !this.option.auto && !this.params.fileId) {
        const { fileLink = '' } = this.params;
        this.params.fileId = fileLink;
        this.params.fileLink = fileLink;
        this.params.fileName = fileLink;
        observer.next({ id: fileLink, path: fileLink });
        observer.complete();
      }
      if (this.files.length > 0) {
        const { name = '', size } = this.files[0].file;
        this.createFileUploaded('', name, '', size, '');
        this._uploader.uploadItem(this.files[0]);
      }
      this._uploader.onSuccessItem = (
        item: FileItem,
        res: string,
        status: number,
        headers: { [headerFieldName: string]: string }
      ) => {
        const result = JSON.parse(res);
        const { file_hash: id, file_name: name, file_size: size, file_url: path } = result._value.files[0];
        this.createFileUploaded(id, name, path, size, '');
        observer.next(result);
        observer.complete();
      };
      this._uploader.onErrorItem = (item: FileItem, res: string) => {
        this.toast.error(this.translocoService.translate(this.pathKeyNgonNgu + "upload_that_bai"))
        observer.next(null);
        observer.complete();
      };
    });
  }

  /*-----------------------------------API SCOPE-----------------------------------*/

  getFileUploaded(id: string) {
    this.fileUploadService.getOneFile(id).subscribe((res) => {
      const { id, name, path, size, link } = res[0] ?? res;
      this.createFileUploaded(id, name, path, size, link);
    });
  }

  handleDelete(file: any) {
    let isCheckError = true;
    if (!this.params.allow_delete_old) {
      this.toast.error(
        this.translocoService.translate(this.pathKeyNgonNgu + "loi_khong_the_xoa"),
      )
      return;
    }
    Swal.fire({
      title: 'Do you want to delete file?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        const { fileId = '' } = file;
        this.fileUploadService.deleteFile(fileId).subscribe({
          next: (res) => {
            isCheckError = false;
            this.onDeleteFile.emit(fileId);
            this.createFileUploaded('', '', '', 0, '');
          },
          complete: () => {
            if (isCheckError) {
              this.toast.error(
                this.translocoService.translate(this.pathKeyNgonNgu + "xoa_that_bai"),
              )
            } else {
              this.toast.success(
                this.translocoService.translate(this.pathKeyNgonNgu + "xoa_thanh_cong"),
              )
            }
          },
        });
      }
    });
  }

  handleDeleteFileMemoryLeak(id: string) {
    this.fileUploadService.deleteFile(id).subscribe({
      complete: () => {
        this.createFileUploaded('', '', '', 0, '');
      },
    });
  }

  /*-----------------------------------HANDLE SCOPE-----------------------------------*/

  deleteFileInQue = (file:any) => {
    this.files.forEach((x) => {
      if (x.file.name === file.file.name) {
        x.remove();
      }
    });
  };

  handleDeleteLink() {
    this.createFileUploaded('', '', '', 0, '');
    this._btn[1].checked = false;
  }

  createFileUploaded(
    id: string,
    name: string,
    path: string,
    size: number,
    link: string
  ) {
    this.params.fileId = id;
    this.params.fileName = name;
    this.params.uploadPath = path;
    this.params.fileSize = size;
    this.params.fileLink = link;
  }

  ChangeStatusToggleBtn(item:any) {
    this.option.activeChoice = +item;
    this._btn[item].checked = true;
    this.keysToggleBtn.forEach((x) => {
      if (x !== item) {
        this._btn[x].checked = false;
      }
    });
    if (this.option.activeChoice === 1) {
      this.setUp();
    }
  }

  inputLinkFile(value:any) {
    value = value.trim();
    this.params.fileLink = value;
    if (this.option.auto) {
      this.onChangeFile.emit(value);
    }
  }

  openFileInput() {
    this.uploadEl.nativeElement.click();
  }

  handlePayload({...payload}: IPayloadUpload) {
    for (const key of Object.keys(payload) as (keyof IPayloadUpload)[]) {
      if(!(key in this.payload)) continue
      this.payload[key] = payload[key] ? payload[key] : this.payload[key];
    }
    this._uploader.options.additionalParameter = this.payload;
  }
}
