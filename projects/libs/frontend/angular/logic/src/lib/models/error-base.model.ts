import { HttpErrorResponse } from "@angular/common/http";

/**
 * Lớp ErrorBase chịu trách nhiệm chuyển đỗi HttpErrorResponse và lấy dữ liệu
 * từ thuộc tính error để dùng xử lý logic nhiệm vụ cho các service gọi api bằng HttpClient.
 */
export class ErrorBase {
  public code: number;
  public message?: string;
  public desc?: string;
  public metadata?: any;
  public path?: any;
  public timestamp?: string;

  constructor(httpErrorResponse: HttpErrorResponse) {
    this.code = httpErrorResponse?.error?.statusCode;
    this.message = httpErrorResponse?.error?.errorMessage ?? '';
    this.path = httpErrorResponse?.error?.path ?? '';
    this.timestamp = httpErrorResponse?.error?.timestamp ?? new Date();
    this.desc = httpErrorResponse?.error?.reasons ?? '-';
    this.metadata = httpErrorResponse?.error?.metadata ?? '-';
  }
}
