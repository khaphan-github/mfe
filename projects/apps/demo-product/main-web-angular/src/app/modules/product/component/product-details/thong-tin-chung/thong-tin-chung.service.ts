import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class ThongTinChungService {

  //#region khai báo biến
  //#endregion

  //#region Các method xử lý data
  /**
   * @param dateStr ngày tháng năm
   * @param hourStr giờ
   * @param minuteStr phút
   * @returns "2004/12/23 02:59" || "2001/09/31 14:00"
   */
  formatTimeToUpdate = (dateStr: string, hourStr: string, minuteStr: string): string => {

    // Chuyển đổi ngày tháng năm thành đối tượng Moment
    const momentDate = moment(new Date(dateStr), 'LLLL');

    // Chuyển đổi giờ và phút thành đối tượng Moment
    const momentTime = moment().set({
      'hour': parseInt(hourStr),
      'minute': parseInt(minuteStr)
    });

    // Kết hợp ngày và thời gian thành một đối tượng Moment hoàn chỉnh
    const resultMoment = momentDate.set({
      'hour': momentTime.hour(),
      'minute': momentTime.minute()
    });

    return resultMoment.format('YYYY-MM-DD HH:mm:ss.SSS');
  }

  /**
   * @param time Time từ api trả về
   * @returns "23/12/2004 02:59" || "12/09/2001 14:00"
   */
  formatTimeFromAPI = (time: string) => {
    // Đối tượng Moment chứa ngày và thời gian
    const resultMoment = moment(time, 'YYYY-MM-DD HH:mm:ss.SSS');
    // const resultMoment = moment(time, 'DD/MM/YYYY HH:mm');

    // Lấy ngày
    const ngay = resultMoment.format('DD');

    // Lấy tháng
    const thang = resultMoment.format('MM');

    // Lấy năm
    const nam = resultMoment.format('YYYY');

    // Lấy giờ
    const gio = resultMoment.format('HH');

    // Lấy phút
    const phut = resultMoment.format('mm');

    return {
      ngay: thang + '/' + ngay + '/' + nam, // chỗ này là do date-picker bị đảo
      // ngay: ngay + '/' + thang + '/' + nam, // nếu đúng là như này
      gio: gio,
      phut: phut
    }
  }
  //#endregion
}
