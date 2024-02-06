import { PriceRange } from "../shared-state/fitler-modal-shared.state";
import { CategoryModel } from "./category.model";

export class Filters {
  companyId: string;         // ID Công ty
  prices: PriceRange;        // Dải giá
  categorySelected: CategoryModel[]; // Danh mục được chọn
  otherOptions: any[];       // Các tùy chọn khác
  page: number;              // Trang hiện tại
  size: number;              // Số lượng mục trên mỗi trang
  searchString: string;            // Tìm kiếm
  currentSelectionItemId: string;

  constructor(args?: any) {
    const {
      companyId = 0,
      prices = {},
      categorySelected = [],
      otherOptions = [],
      page = 0,
      size = 0,
      searchString = "",
      currentSelectionItemId = ""
    } = args || {};
    this.companyId = companyId;
    this.prices = prices;
    this.categorySelected = categorySelected;
    this.otherOptions = otherOptions;
    this.page = page;
    this.size = size;
    this.searchString = searchString;
    this.currentSelectionItemId = currentSelectionItemId;

  }
}
