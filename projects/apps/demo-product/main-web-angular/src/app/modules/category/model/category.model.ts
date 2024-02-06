import * as _ from "lodash";

export class Category {
  id: number;
  name: string;
  lft: number;
  rgt: number;
  alias: string;

  constructor(args?: any) {
    const { id = 0, name = '', lft = 0, rgt = 0, alias = '' } = args || {};
    this.id = id;
    this.name = name;
    this.lft = lft;
    this.rgt = rgt;
    this.alias = alias;

    // Các xử lý dữ liệu khác trong model nếu cần
    this.doSomethingWithData();
  }

  private doSomethingWithData() {
    // Các xử lý dữ liệu trong model nếu cần
  }
}

export class Categories {
  private nodeTree: Array<Category> = [];

  constructor(args?: any) {
    const { categories = [] } = args || {};
    this.nodeTree = categories;
  }

  hasData(): boolean {
    // Kiểm tra xem nodeTree có dữ liệu hay không
    return this.nodeTree.length > 0;
  }

  convertDataFromAPI(args?: any): void {
    const data = args;

    this.nodeTree = _.map(data, (value) => {
      return new Category({
        id: value.id,
        name: value.name,
        lft: value.lft,
        rgt: value.rgt,
        alias: value.alias,
      });
    });
  }

  getChildrenOfNode(nodeAlias: string, deep?: number): Category[] {
    // Tìm giá trị lft và rgt của nút có id là nodeId
    const { lft, rgt } = this.getChildrenOfNode_findNodeLftRgt(nodeAlias);

    // Sử dụng mảng tìm kiếm để thu thập các mục con
    const children = this.nodeTree.filter((item) => {
      return item.lft > lft && item.rgt < rgt;
    });

    return children;
  }

  private getChildrenOfNode_findNodeLftRgt(nodeAlias: string): {
    lft: number;
    rgt: number;
  } {
    const node = this.nodeTree.find((item) => item.alias === nodeAlias);
    if (node) {
      return { lft: node.lft, rgt: node.rgt };
    }
    // Trường hợp không tìm thấy nút có id là nodeId
    return { lft: -1, rgt: -1 }; // Hoặc có thể trả về null hoặc ném một ngoại lệ tùy ý.
  }


  findById = (id: number | string): Category | undefined => {
    const currentList = this.nodeTree;
    if (currentList) {
      return currentList.find(category => category.id == id);
    }
    return undefined;
  }
}

// CREATE TABLE test(
//    "id" serial PRIMARY KEY,
//    "name" VARCHAR,
//    "lft" INT4,
//    "rgt" INT4
// );

// setCategories(data: Array<Category>) {
//   this.categories = data;
// }

// getCategories() {
//   return this.categories;
// }

// appendItemsToCategoryList = (model: Category) => {
//   this.categories.unshift(model);
// }

// updateItemExistedInCategoryList = (model: Category) => {
//   const existingItemIndex = this.categories.findIndex(item => item.id === model.id);

//   if (existingItemIndex !== -1) {
//     this.categories[existingItemIndex] = model;
//   } else {
//     this.categories.unshift(model);
//   }
// }

