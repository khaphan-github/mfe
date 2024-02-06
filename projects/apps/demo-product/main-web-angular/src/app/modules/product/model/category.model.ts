import { APIDataHandler } from "@erp/angular/logic";

export type CategoryModel = {
  id: number;
  name: string;
  disabled: boolean;
};

export class CategoryDataHandler implements APIDataHandler<CategoryModel[]> {
  private filterData: CategoryModel[] = [];

  constructor(args?: any) {
    this.filterData = args;
  }
  mapDataFromAPI(response?: any): CategoryModel[] {
    return this.filterData;
  }

}


export class Category {
  id: number | string;
  type: string;
  name: string;
  data_sources: Array<CategoryItem>;
  key: string;

  constructor(args?: any) {
    const {
      id = 0,
      type = "string",
      name = "",
      data_sources = [],
      key = ""
    } = args || {};
    this.id = id;
    this.type = type;
    this.data_sources = data_sources;
    this.name = name;
    this.key = key;
  }

  setDataByResponse = (response: any) => {
    return response as Category;
  }
}

export interface CategoryItem {
  id: number | string;
  name: string;
}
