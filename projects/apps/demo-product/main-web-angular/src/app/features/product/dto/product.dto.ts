import { CategoryInit } from "../model/product.model";

export interface ICreateProductDto  {
  name: string;
}


export interface IUpdateProductDto  {
  id: number,
  key?: number,
  info?: {
    name_default?: string,
    name_display?: string,
    description?: string,
    images?: {
      anh_dai_dien?: Array<string>,
      bo_suu_tap?: Array<string>
    },
    seo?: {
      url_key?: string,
      meta_title?: string,
      meta_keywords?: string,
      meta_description?: string
    }
  },
  current_status?: "active" | "inactive",
  public_time?: string,
  category?: Array<CategoryInit>
}
