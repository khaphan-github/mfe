import _ from "lodash";

export class Attribute {
  id: number | string;
  type: string;
  name: string;
  data_sources: Array<AttributeItem>;
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
    return response as Attribute;
  }
}

export interface AttributeItem {
  id: number | string;
  name: string;
}
