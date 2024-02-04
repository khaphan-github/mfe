import _ from 'lodash';
import { defaultMinCountForSearch, protectRegexp, unicodePatterns } from './select2-const';
import { Select2Data, Select2Group, Select2Option, Select2UpdateValue, Select2Value } from './select2-interfaces';

export class Select2Utils {
  static getOptionByValue(data: Select2Data, value: Select2Value | null | undefined) {
    if (Array.isArray(data)) {
      for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
          for (const option of options) {
            if (option.value === value) {
              return option;
            }
          }
        } else if ((groupOrOption as Select2Option).value === value) {
          return groupOrOption as Select2Option;
        }
      }
    }
    return undefined;
  }

  static getOptionsByValue(
    data: Select2Data,
    value: Select2UpdateValue | null | undefined,
    multiple: boolean | null | undefined,
  ) {
    if (multiple) {
      const values: Select2Value[] = Array.isArray(value) ? value : [];
      const result: Select2Option[] = [];
      for (const v of values) {
        const option = Select2Utils.getOptionByValue(data, v);
        if (option) {
          result.push(option);
        }
      }
      return result;
    }
    return Select2Utils.getOptionByValue(data, value as Select2Value | null | undefined);
  }

  static getFirstAvailableOption(data: Select2Data) {
    if (Array.isArray(data)) {
      for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
          for (const option of options) {
            if (!option.disabled) {
              return option.value;
            }
          }
        } else {
          const option = groupOrOption as Select2Option;
          if (!option.disabled) {
            return option.value;
          }
        }
      }
    }
    return null;
  }

  static valueIsNotInFilteredData(filteredData: Select2Data, value: Select2Value | null | undefined) {
    if (Select2Utils.isNullOrUndefined(value)) {
      return true;
    }
    for (const groupOrOption of filteredData) {
      const options = (groupOrOption as Select2Group).options;
      if (options) {
        for (const option of options) {
          if (option.value === value) {
            return false;
          }
        }
      } else if ((groupOrOption as Select2Option).value === value) {
        return false;
      }
    }
    return true;
  }

  // eslint-disable-next-line
  static getPreviousOption(filteredData: Select2Data, hoveringValue: Select2Value | null | undefined) {
    let findIt = Select2Utils.isNullOrUndefined(hoveringValue);
    for (let i = filteredData.length - 1; i >= 0; i--) {
      const groupOrOption = filteredData[i];
      const options = (groupOrOption as Select2Group).options;
      if (options) {
        for (let j = options.length - 1; j >= 0; j--) {
          const option = options[j];
          if (findIt && !option.disabled && !option.hide) {
            return option;
          }
          if (!findIt) {
            findIt = option.value === hoveringValue;
          }
        }
      } else {
        const option = groupOrOption as Select2Option;
        if (findIt && !option.disabled && !option.hide) {
          return option;
        }
        if (!findIt) {
          findIt = option.value === hoveringValue;
        }
      }
    }
    return null;
  }
  // eslint-disable-next-line
  static getNextOption(filteredData: Select2Data, hoveringValue: Select2Value | null | undefined) {
    let findIt = Select2Utils.isNullOrUndefined(hoveringValue);
    for (const groupOrOption of filteredData) {
      const options = (groupOrOption as Select2Group).options;
      if (options) {
        for (const option of options) {
          if (findIt) {
            if (!option.disabled && !option.hide) {
              return option;
            }
          } else if (!findIt) {
            findIt = option.value === hoveringValue;
          }
        }
      } else {
        const option = groupOrOption as Select2Option;
        if (findIt) {
          if (!option.disabled && !option.hide) {
            return option;
          }
        } else if (!findIt) {
          findIt = option.value === hoveringValue;
        }
      }
    }
    return null;
  }

  static getReduceData(data: Select2Data, maxResults = 0): { result: Select2Data; reduce: boolean } {
    if (maxResults > 0) {
      let counter = 0;
      const result: Select2Data = [];
      // debugger;

      for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
          const group = {
            ...groupOrOption,
            options: [],
          };
          result.push(group);
          for (const item of options) {
            // Change: item -> item as never;
            group.options.push(item as never);
            counter++;
            if (counter === maxResults) {
              return { result, reduce: true };
            }
          }
        } else {
          result.push(groupOrOption);
          counter++;
        }
        if (counter === maxResults) {
          return { result, reduce: true };
        }
      }
      return { result, reduce: false };
    } else {
      return { result: data, reduce: false };
    }
  }

  static getFilteredData(
    data: Select2Data,
    searchText: string | null,
    editPattern?: (str: string) => string,
  ): Select2Data {
    if (searchText) {
      const result: Select2Data = [];
      for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        // Case search object
        const isSearhByOBject = groupOrOption?.searchData && groupOrOption?.searchData?.length !== 0;

        // Case searh with group
        if (options) {
          if (groupOrOption.enableCustomSearch) {
            const filteredOptionsArray = [];
            for (let index = 0; index < options.length; index++) {
              const filteredOptions =
                this.containSearchTextInObjectValue(searchText, options[index]?.searchData, editPattern);

              if (filteredOptions) {
                filteredOptionsArray.push(options[index]);
              }
            }
            result.push({
              ...groupOrOption,
              options: filteredOptionsArray,
            });
          } else {
            if (options.some(group => Select2Utils.containSearchText(group.label, searchText, editPattern))) {

              const filteredOptions = options.filter(group =>
                Select2Utils.containSearchText(group.label, searchText, editPattern),
              );

              result.push({
                ...groupOrOption,
                options: filteredOptions,
              });
            }
          }
          // Case search without group
        } else {
          if (isSearhByOBject) {
            if (this.containSearchTextInObjectValue(searchText, groupOrOption?.searchData, editPattern)) {
              result.push(groupOrOption);
            }
          } else {
            if (Select2Utils.containSearchText(groupOrOption.label, searchText, editPattern)) {
              result.push(groupOrOption);
            }
          }
        }
      }
      return result;
    } else {
      return data;
    }
  }

  static getFilteredSelectedData(
    data: Select2Data,
    selectedOptions: Select2Option | Select2Option[] | null,
  ): Select2Data {
    const result: Select2Data = [];
    for (const groupOrOption of data) {
      const options = (groupOrOption as Select2Group).options;
      if (options) {
        const filteredOptions = options.filter(
          group => Select2Utils.isSelected(selectedOptions, group, true) === 'false',
        );
        if (filteredOptions.length) {
          result.push({
            ...groupOrOption,
            options: filteredOptions,
          });
        }
      } else if (Select2Utils.isSelected(selectedOptions, groupOrOption as Select2Option, true) === 'false') {
        result.push(groupOrOption);
      }
    }
    return result;
  }

  static isSearchboxHiddex(data: Select2Data, minCountForSearch?: number | string): boolean {
    if (
      minCountForSearch === '' ||
      minCountForSearch === undefined ||
      minCountForSearch === null ||
      isNaN(+minCountForSearch)
    ) {
      minCountForSearch = defaultMinCountForSearch;
    }
    const optionCount = Select2Utils.getOptionsCount(data);
    return optionCount < +minCountForSearch;
  }

  static isSelected(
    options: Select2Option | Select2Option[] | null,
    option: Select2Option,
    multiple: boolean | null | undefined,
  ) {
    return multiple
      ? options && (options as Select2Option[]).some(op => op.value === option.value)
        ? 'true'
        : 'false'
      : options && option.value === (options as Select2Option).value
        ? 'true'
        : 'false';
  }

  static removeSelection(options: Select2Option | Select2Option[] | null, option: Select2Option) {
    for (let i = 0; i < (options as Select2Option[]).length; i++) {
      if ((options as Select2Option[])[i].value === option.value) {
        (options as Select2Option[]).splice(i, 1);
        return;
      }
    }
  }

  private static getOptionsCount(data: Select2Data) {
    let count = 0;
    if (Array.isArray(data)) {
      for (const groupOrOption of data) {
        const options = (groupOrOption as Select2Group).options;
        if (options) {
          count += options.length;
        } else {
          count++;
        }
      }
    }
    return count;
  }

  private static isNullOrUndefined(value: any) {
    return value === null || value === undefined;
  }

  private static containSearchText(
    label: string,
    searchText: string | null,
    editPattern: ((str: string) => string) | undefined,
  ): boolean {
    return searchText
      ? Select2Utils.formatSansUnicode(label).match(
        new RegExp(Select2Utils.formatPattern(searchText, editPattern), 'i'),
      ) !== null
      : true;
  }

  private static protectPattern(str: string): string {
    return str.replace(protectRegexp, '\\$&');
  }

  private static formatSansUnicode(str: string): string {
    for (const unicodePattern of unicodePatterns) {
      str = str.replace(unicodePattern.s, unicodePattern.l);
    }
    return str;
  }

  private static formatPattern(str: string, editPattern: ((str: string) => string) | undefined): string {
    str = Select2Utils.formatSansUnicode(Select2Utils.protectPattern(str));

    if (editPattern && typeof editPattern === 'function') {
      str = editPattern(str);
    }
    return str;
  }

  // @author Kha - Search with local data by key;
  private static containSearchTextInObjectValue(
    searchString: string,
    arraySearch: any,
    editPattern: ((str: string) => string) | undefined,
  ): boolean {
    for (let index = 0; index < arraySearch.length; index++) {
      const element = arraySearch[index];
      if (
        Select2Utils.containSearchText(element?.toString(), searchString, editPattern)
        || Select2Utils.toNonAccentVietnamese(element?.toString()).search(Select2Utils.toNonAccentVietnamese(searchString)) !== -1
      ) {
        return true;
      }
    }
    return false;
  }

  // @author Kha - Convert Vietnammese text;
  private static toNonAccentVietnamese(str: string) {
    str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/đ/g, "d");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
    return str;
  }
}
