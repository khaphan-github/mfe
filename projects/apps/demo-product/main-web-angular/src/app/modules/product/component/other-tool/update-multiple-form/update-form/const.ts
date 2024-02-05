import { IFileUploadMultiOption } from "@erp/angular/components";

export const FILE_UPLOAD_OPTIONS: IFileUploadMultiOption = {
  urlFile: `/upload`,
  authToken: ``,
  auto: false,
  allowDelete: true,
  allowedType: [],
  sizeCheck: 50,
  isHidden: true,
  isShowPicture: true,
  removeAfterUpload: true,
}
