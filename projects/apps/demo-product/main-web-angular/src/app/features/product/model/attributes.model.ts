import _ from "lodash";
import { Attribute } from "./attribute.model";


export class AttributesModel {

  private attributes: Array<Attribute> = [];

  constructor(args?: any) {
    const {
      attributes = []
    } = args || {};
    this.attributes = attributes;
  }

  setAttributes(data: Array<Attribute>) {
    this.attributes = data;
  }

  getAttributes() {
    return this.attributes;
  }

  appendItemsToAttributeList = (model: Attribute) => {
    this.attributes.unshift(model);
  }

  // Update if exist else add new
  updateItemExistedInAttributeList = (model: Attribute) => {

    const existingItemIndex = this.attributes.findIndex(item => item.id === model.id);

    if (existingItemIndex !== -1) {
      this.attributes[existingItemIndex] = model;
    } else {
      this.attributes.unshift(model);
    }
  }


  findById = (id: number | string): Attribute | undefined => {
    const currentList = this.attributes;
    if (currentList) {
      return currentList.find(attribute => attribute.id == id);
    }
    return undefined;
  }

}
