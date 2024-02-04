/*
 --------------------CHÚ THÍCH---------------------------
 -- allowType: loại file cho phép upload
 -- auto: true(tự động upload khi thêm file)
 -- allowDelete: true(cho phép xóa file)
 -- fileView(***): mặc định cho là list vì thumb ko xài được.
 luôn luôn cho fileView='list'
 -- choices:number[]:
    --- gồm 3 chức năng:
        1 -> upload file từ máy tính
        2 -> chép link ngoài
    --- chú thích:
     ---- TH1: ghi [1] hay [2] -> chỉ hiển thị 1 chức năng
     ---- TH2: [1,2]  -> cả 2 chức năng hiện theo lựa chọn của radio button
-- activeChoice: dùng cho loại nhiều chức năng (choice có 2 phần tử). active chức năng mình muốn sử dụng
-- thumb:boolean -> true: hiện thẻ img, ngược lại hiện icon (hiện tại chỉ dùng cho chép link)
-- urlFile: link api để upload file (ko có dùng default url api file cũ)
-- is_allow_upload:boolean -> true cho phép upload, false ngược lại
-- name: tránh bị trùng name của radio
-- sizeCheck: kích thước file cho phép
*/
export interface IFileUploadSingleOption {
  auto?: boolean;
  fileView?: string;
  allowDelete?: boolean;
  choices: number[];
  activeChoice?: number;
  thumb?: boolean;
  allowedType?: string[];
  sizeCheck?: number;
  urlFile?: string;
  is_allow_upload?: boolean;
  name?: string;
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
  - Sử dụng cho chép link ngoài
  -- fileLink -> url chép từ địa chỉ của file ngoài
  -- allow_delete_old -> cho phép xoá file hay không
*/

export interface IParamUploadSingleFile {
  [key: string]: any;
  fileId?: string;
  fileName?: string;
  fileSize?: number;
  allow_delete_old?: boolean;
  fileLink?: string;
  uploadPath?: string;
  type?: string;
}

/**
 * @params id - id của file
 * @params path - đường dẫn của file
 */
export interface IValueOutputFileUpload {
  [key: string]: any
  isSuccess?: boolean;
  isFailure?: boolean;
  error?: any;
  _value?: Partial<I_Value>;
}

/**
 * @params type - loại file
 * @params ext - đuôi file
 */
export interface IPayloadUpload {
  type?: string;
  ext?: string;
}

export interface I_Value {
  files: IFiles[]
}

export interface IFiles {
  server_file_name: string;
  filePath: string;
  file_name: string;
  file_size: string;
  file_hash: string;
  file_url: string;
}

