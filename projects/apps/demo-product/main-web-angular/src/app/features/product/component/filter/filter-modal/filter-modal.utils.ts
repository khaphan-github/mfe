import { Select2Option, ICheckbox } from '@erp/angular/components';
import * as _ from 'lodash';
import { Category } from '../../../../category/model/category.model';

export class FilterModalUtils {
  public static mapCategoriesToSelect2(categories: Category[]): Array<Select2Option> {
    if (categories.length === 0) {
      return [];
    };
    return _.map(categories, (item) => {
      const select2Item: Select2Option = {
        label: item.name,
        value: item.id,
        id: item.id.toString(),
        data: item
      }
      return select2Item;
    });
  }

  public static mapCategoriesToCheckBox(categories: Category[]): Array<any> {
    return categories.map((category: Category) => ({
      id: category.id, // Thêm thuộc tính 'id'
      name: category.name, // Thêm thuộc tính 'name'
      disabled: false, // Thêm thuộc tính 'disabled' với giá trị mặc định (có thể thay đổi nếu cần)
      selected: false, // Thêm thuộc tính 'selected' với giá trị mặc định (có thể thay đổi nếu cần)
    }));
  }

  public static mapSelectedCheckboxToAllCheckBox(
    checkedBoxes: Array<ICheckbox>, allCheckBox: Array<ICheckbox>
  ): Array<ICheckbox> {
    return allCheckBox.map((checkbox) => {
      const isChecked = checkedBoxes.some((checkedBox) => checkedBox.id == checkbox.id);
      return {
        ...checkbox,
        selected: isChecked,
      };
    });
  }

  public static updateCheckedBox(
    checked: boolean,
    selectedItem: ICheckbox,
    arrayCheckBoxes: Array<ICheckbox>
  ) {
    const indexToUpdate = arrayCheckBoxes.findIndex(item =>
      item.id === selectedItem?.id
    );

    if (indexToUpdate !== -1) {
      arrayCheckBoxes[indexToUpdate].selected = checked;
    }

    return arrayCheckBoxes;
  }

  public static getCheckedBoxFrom(arrayCheckBoxes: Array<ICheckbox>) {
    return _.filter(arrayCheckBoxes, { selected: true, });
  }


  public static resetCheckBox(checked: boolean, arrayCheckBoxes: Array<ICheckbox>) {
    arrayCheckBoxes.forEach((checkbox) => {
      checkbox.selected = checked;
    });
    return arrayCheckBoxes;
  }

}
