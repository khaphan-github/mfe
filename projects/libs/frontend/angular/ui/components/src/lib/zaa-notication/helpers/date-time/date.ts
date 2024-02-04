import Moment from 'moment';
import { extendMoment } from 'moment-range';
import 'moment/min/locales';

const moment = extendMoment(Moment as any);
export enum DayOfWeekEnum {
  CHU_NHAT = 0,
  THU_2 = 1,
  THU_3 = 2,
  THU_4 = 3,
  THU_5 = 4,
  THU_6 = 5,
  THU_7 = 6,
}

export enum MonthEnum {
  THANG_1 = 1,
  THANG_2 = 2,
  THANG_3 = 3,
  THANG_4 = 4,
  THANG_5 = 5,
  THANG_6 = 6,
  THANG_7 = 7,
  THANG_8 = 8,
  THANG_9 = 9,
  THANG_10 = 10,
  THANG_11 = 11,
  THANG_12 = 12,
}

export class DATE {
  static formatDate = 'YYYY-MM-DD';
  static formatFull = 'YYYY-MM-DD HH:mm:ss';
  static formatAfter = 'DD/MM/YYYY HH:mm:ss';
  static formatAfter2 = 'DD/MM/YYYY HH:mm';
  static formatAfter3 = 'MM/DD/YYYY HH:mm:ss';
  static formatAfter4 = 'MM/DD/YYYY HH:mm';
  static formatDDMMYYYY = 'DD/MM/YYYY';
  static formatYYYYMMDDHHmm = 'YYYY-MM-DD HH:mm';
  static formatYYYMMDDHHmmss = 'YYYY-MM-DD HH:mm:ss';
  static formatId = 'DDMMYYYYHHmmssSSS';

  static formatTime = 'HH:mm:ss';

  /**
   * @author Cường
   * @description hiển thị: Wednesday, December 20, 2023
  */
  static DDDD_Month_DD_year = "dddd, MMMM D, YYYY";
  /**
   * @description hiển thị: thứ sáu, 22 tháng 12 năm 2023
  */
 static format_ThuCommasNgayThangNam = 'dddd, DD [tháng] MM [năm] YYYY';
  /**
   * @description hiển thị: 08:44:11 AM
  */
 static formatTimeAMPM = 'HH:mm:ss A';

  static nowByLocal(date: string, lang: string) {
    return moment(date)
      .locale(lang || 'vi')
      .fromNow();
  }
  static now() {
    return moment();
  }

  static date(date: string) {
    return moment(date);
  }

  static dayOfWeek(
    date: string,
    format: string
  ): { dow: number; text: string } {
    let dow = moment(date, format).days();
    switch (moment(date, format).days()) {
      case DayOfWeekEnum.CHU_NHAT:
        return {
          dow: dow,
          text: 'Chủ nhật',
        };
      case DayOfWeekEnum.THU_2:
      case DayOfWeekEnum.THU_3:
      case DayOfWeekEnum.THU_4:
      case DayOfWeekEnum.THU_5:
      case DayOfWeekEnum.THU_6:
      case DayOfWeekEnum.THU_7:
        return {
          dow: dow,
          text: 'Thứ ' + (+dow + 1),
        };
      default:
        return {
          dow: 0,
          text: '',
        };
    }
  }

  static getDayOfWeekName(dow: number): { dow: number, text: string } {
    switch (dow) {
      case DayOfWeekEnum.CHU_NHAT:
        return {
          dow: dow,
          text: "Chủ nhật"
        };
      case DayOfWeekEnum.THU_2:
      case DayOfWeekEnum.THU_3:
      case DayOfWeekEnum.THU_4:
      case DayOfWeekEnum.THU_5:
      case DayOfWeekEnum.THU_6:
      case DayOfWeekEnum.THU_7:
        return {
          dow: dow,
          text: "Thứ " + (+dow + 1)
        };
      default:
        return {
          dow: 0,
          text: ""
        };
    }
  }

  static add(amount: any, unit: string, format: string) {
    return moment().add(amount, unit).format(format);
  }

  static formatDatabaseDateTime(date: string) {
    if (date) {
      return moment(date).format(this.formatFull);
    }
    return '';
  }

  static formatDateTime(date: string) {
    if (date) {
      return moment(date, this.formatFull).format(this.formatAfter);
    }
    return '';
  }

  static formatDateTime2(date: string) {
    if (date) {
      return moment(date, this.formatFull).format(this.formatAfter2);
    }
    return '';
  }

  static formatShortDate(date: string) {
    if (date) {
      return moment(date, this.formatFull).format(this.formatDDMMYYYY);
    }
    return '';
  }

  static formatCustom(date: string, format: string, lang: string) {
    return moment(date)
     .locale(lang || 'vi')
     .format(format);
  };

  static duration(date1: any, date2: any, format: string) {
    if (!date1 || !date2) {
      return 0;
    }
    date1 = moment(date1, format);
    date2 = moment(date2, format);
    return Math.abs(date1.diff(date2, 'second'));
  }

  static isBefore(date1: string, date2: string) {
    if (date1 && date2) {
      return moment(date1, this.formatFull).isBefore(
        moment(date2, this.formatFull)
      );
    }
    return false;
  }

  static isOverlap(
    startDate1: string,
    endDate1: string,
    startDate2: string,
    endDate2: string
  ) {
    const range1 = moment.range(
      moment(startDate1, this.formatFull),
      moment(endDate1, this.formatFull)
    );
    const range2 = moment.range(
      moment(startDate2, this.formatFull),
      moment(endDate2, this.formatFull)
    );
    return range1.overlaps(range2);
  }
}
