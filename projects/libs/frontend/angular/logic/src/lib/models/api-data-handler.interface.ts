/**
 * DataHandler là một interface định nghĩa cho việc xử lý dữ liệu.
 * Các lớp con mở rộng (implement) lớp này phải triển khai phương thức 'handle'.
 */
export interface APIDataHandler<T> {
  /**
   * Phương thức này phải được triển khai bởi các lớp con để xử lý dữ liệu.
   *
   * @returns {T} Kết quả của việc xử lý dữ liệu. (generic) 
   * @abstract
   *
   * dung generic
   */
  mapDataFromAPI(response?: any): T;
}
 