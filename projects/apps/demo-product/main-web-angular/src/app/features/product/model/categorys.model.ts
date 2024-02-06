import { Category } from "./category.model";


export class CategoriesModel {

  private categories: Array<Category> = [];

  constructor(args?: any) {
    const {
      categories = []
    } = args || {};
    this.categories = categories;
  }

  setCategories(data: Array<Category>) {
    this.categories = data;
  }

  getCategories() {
    return this.categories;
  }


  appendItemsToCategoryList = (model: Category) => {
    this.categories.unshift(model);
  }


  updateItemExistedInCategoryList = (model: Category) => {
    const existingItemIndex = this.categories.findIndex(item => item.id === model.id);

    if (existingItemIndex !== -1) {
      this.categories[existingItemIndex] = model;
    } else {
      this.categories.unshift(model);
    }
  }

  findById = (id: number | string): Category | undefined => {
    const currentList = this.categories;
    if (currentList) {
      return currentList.find(category => category.id == id);
    }
    return undefined;
  }

}
