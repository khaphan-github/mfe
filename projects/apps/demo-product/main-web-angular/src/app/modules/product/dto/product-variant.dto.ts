import { AttributeInit, IPriceProductVariant } from "../model/product-variant.model";

export interface ICreateProductVariantDto {
  name_variant: string;
}


export interface IUpdateProductVariantDto {
  key?: string,
  info?: IInfoProductVariantDto,
  is_default?: boolean,
  attribute?: Array<AttributeInit>,
  prices?: IPriceProductVariantDto,
  current_status?: "active" | "inactive",
  public_time?: string
}

export interface IPriceProductVariantDto {
  retail?: number;
  wholesale?: number;
}

export interface IInfoProductVariantDto {
  name_variant?: string,
}
