export class ComponentCheckBoxHelper<T> {
  selectedItems = new Map<string | number, T>();
  isCheckedAll: boolean = false;
  totalItemInTable: number = 0;

  constructor(private readonly keyName: string) {
    if (keyName.trim().length === 0) {
      throw new Error(`ComponentCheckBoxHelper keyName should not be empty`);
    }
  }

  handleOneChecked(checked: boolean, key: string | number, item: T) {
    checked ? this.selectedItems.set(key, item)
      : this.selectedItems.delete(key);

    if (this.selectedItems.size < this.totalItemInTable) {
      this.isCheckedAll = false
    } else if (this.selectedItems.size === this.totalItemInTable) {
      this.isCheckedAll = true
    }
  }

  handleCheckAllItems(checked: boolean, item: T[]) {
    this.isCheckedAll = checked;
    if (!checked) {
      this.selectedItems.clear();
    } else {
      for (let index = 0; index < item.length; index++) {
        this.selectedItems.set((item[index] as any)[this.keyName.toString()], item[index]);
      }
    }
  }

  getArraySelected = () => {
    return Array.from(this.selectedItems.values());
  }

  refreshCheckBox() {
    this.selectedItems.clear();
    this.isCheckedAll = false;
  }
}
