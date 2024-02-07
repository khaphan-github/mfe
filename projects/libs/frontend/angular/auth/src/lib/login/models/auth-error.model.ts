import { ErrorBase } from "@erp/angular/logic"

export class AuthErrorModel {
  public static ERROR_CODE = {
    NOT_ALLOW_TO_LOGIN: 'NOT_ALLOW_TO_LOGIN',
    WRONG_PASSWORD: 'WRONG_PASSWORD',
    ACCOUNT_INACTIVE: 'ACCOUNT_INACTIVE',
    ACCOUNT_LOCKED: 'ACCOUNT_LOCKED',
    ACCOUNT_NOT_EXISTED: 'ACCOUNT_NOT_EXISTED',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  }

  public static handle(error: ErrorBase) {
    switch (error.code) {
      // Tài khoản này không thể login vào hệ thống hiện tại
      case -403:
        throw new Error(AuthErrorModel.ERROR_CODE.NOT_ALLOW_TO_LOGIN)

      // Đăng nhập sai mật khẩu
      case -1:
        throw new Error(AuthErrorModel.ERROR_CODE.WRONG_PASSWORD)

      // Tài khoản chưa được kích hoạt
      case -2:
        throw new Error(AuthErrorModel.ERROR_CODE.ACCOUNT_INACTIVE)

      // Tài khoản bị khóa tiêu rồi
      case -3:
        throw new Error(AuthErrorModel.ERROR_CODE.ACCOUNT_LOCKED)

      // Tài khoản không tồn tại hoặc sai tên đăng nhập
      case 404:
        throw new Error(AuthErrorModel.ERROR_CODE.ACCOUNT_NOT_EXISTED)

      default:
        break;
    }

    throw new Error(AuthErrorModel.ERROR_CODE.INTERNAL_SERVER_ERROR)
  }
}
