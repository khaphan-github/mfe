/*
 --------------------CHÚ THÍCH---------------------------
 -- allowType: loại file cho phép upload
 -- auto: true(tự động upload khi thêm file)
 -- allowDelete: true(cho phép xóa file)
 -- fileView(***): mặc định cho là list vì thumb ko xài được.
 luôn luôn cho fileView='list'
 -- lockUpload: khóa tác vụ xóa và upload files
 -- urlFile: link api để upload file (ko có dùng default url api file cũ)
 -- isShowPicture: true -> hiện hình ảnh
-- sizeCheck: kích thước file cho phép
*/
export interface IFileUploadMultiOption {
  allowedType?: string[];
  auto?: boolean;
  fileView?: string;
  allowDelete?: boolean;
  sizeCheck?: number;
  lockUpload?: boolean;
  urlFile?: string;
  isShowPicture?: boolean;
  isHidden?:boolean;
  headers?: Headers[];
  authToken?: string;
  itemAlias?: string;
  removeAfterUpload?: boolean;
}

export interface Headers {
  name: string;
  value: string;
}

/*
  PARAMS Input() của component:
  - Sử dụng cho upload file
  -- fileId -> id của dòng dữ liệu liên quan tới file
  -- fileName -> tên của dữ liệu liên quan tới file
  -- uploadPath -> đường dẫn thư mục chứa file
  -- fileSize -> kích thước file
*/

export interface IParamUploadMultiFile {
  [key: string]: any;
  fileId?: string[];
  fileName?: string;
  fileSize?: number;
  uploadPath?: string;
  type?: string;
}

/**
 * @params success - file upload thành công
 * @params error - file bị lỗi
 */
export interface IValueOutputFileUpload {
  success: File[];
  error: IValueOutoutFileUploadError[];
}

interface IValueOutoutFileUploadError {
  name: string;
}
