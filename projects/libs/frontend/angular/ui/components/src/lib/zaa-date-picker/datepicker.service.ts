import { Injectable } from '@angular/core';
import _ from 'lodash';
import  { initDatepickerSingle } from "datepickerSingle";
import  { initDatepickerRange } from "datepickerRange";
import moment from 'moment';
import { FormatDatesConfigVariables } from './formatDates.config';
declare var $: any;
@Injectable({
  providedIn: 'root',
})
export class DatePickerService {
  private loadedCssFiles = new Set<string>();

  constructor() {
    // Load css
    this.loadCss(
      '../../../../assets/css/formplugins/bootstrap-datepicker/bootstrap-datepicker.css',
      'bootstrap-datepicker',
      'screen, print'
    );
    this.loadCss(
      '../../../../assets/css/formplugins/bootstrap-daterangepicker/bootstrap-daterangepicker.css',
      'bootstrap-daterangepicker',
      'screen, print'
    );
    // Kích hoạt js cho datepicker
    initDatepickerSingle();
    initDatepickerRange(this, $, moment);
  }

  /**
   * Dùng để load css lên cho select2
   * @param cssUrl : đường dẫn của css
   * @param id: id của link
   * @param media: khai báo media cho link
   */

  loadCss(cssUrl: string, id: string, media: string): void {
    if (!this.loadedCssFiles.has(cssUrl)) {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = cssUrl;
      linkElement.id = id;
      linkElement.media = media;
      document.head.appendChild(linkElement);
      this.loadedCssFiles.add(cssUrl);
    }
  }

  activeJsDatePicker = (data: any) => {
    const { element, orientation, todayHighlight, todayBtn, clearBtn } = data;

    /**
     * ClassName của 2 icon chuyển ngày
     */
    const controls = {
      leftArrow: '<i class="fal fa-angle-left" style="font-size: 1.25rem"></i>',
      rightArrow:
        '<i class="fal fa-angle-right" style="font-size: 1.25rem"></i>',
    };

    element.datepicker({
      todayBtn,
      clearBtn,
      todayHighlight,
      orientation,
      templates: controls,
    });
  };

  activeJsDatePickerRange = (data: any) => {
    const {
      element,
      opens,
      timePicker,
      singleDatePicker,
      showDropdowns,
      isPredefined,
      showWeekNumbers,
      showISOWeekNumbers,
      timePicker24Hour,
      timePickerSeconds,
      autoApply,
      maxDays,
      alwaysShowCalendars,
      applyButtonClasses,
      cancelClass,
    } = data;
    let optionsConfig = {};
    if (isPredefined) {
      const ranges = {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
          moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month'),
        ],
      };
      Object.assign(optionsConfig, { ranges });
    }
    if (maxDays) {
      const maxSpan = {
        days: maxDays,
      };
      Object.assign(optionsConfig, { maxSpan });
    }

    element.daterangepicker({
      opens,
      timePicker,
      startDate: moment(),
      endDate: moment().add(1, 'days'),
      locale: {
        format: FormatDatesConfigVariables.defaultFormatValue,
      },
      singleDatePicker,
      showDropdowns,
      showWeekNumbers,
      showISOWeekNumbers,
      timePicker24Hour,
      timePickerSeconds,
      autoApply,
      alwaysShowCalendars,
      applyButtonClasses,
      cancelClass,
      ...optionsConfig,
    });
  };
}
