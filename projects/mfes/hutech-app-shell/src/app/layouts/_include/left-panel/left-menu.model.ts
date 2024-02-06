export class LeftMenuItem {
  //Thong tin co ban
  icon: string;
  route: string;
  title : string;
  dataFilterTags: string;
  dataI18n: string;
  children: Array<LeftMenuItem>;
  actionId: number;

  constructor(args?: any) {
    const {
      icon = "",
      route = "",
      title = "",
      dataFilterTags = "",
      dataI18n = "",
      children = [],
      actionId = 0
    } = args || {};
    this.icon = icon;
    this.route = route;
    this.title = title;
    this.dataFilterTags = dataFilterTags;
    this.dataI18n = dataI18n;
    this.children = children;
    this.actionId = actionId;
  }

  mapFromPolicy(data: any) {
    this.icon = "";
    this.route = data.url;
    this.title = data.name;
    this.dataFilterTags = "";
    this.dataI18n = "";
    this.children = data.children;
    this.actionId = data.value;
  }

  convertLeftMenuPolicyToClass(policy: any): LeftMenuItem {
    const leftMenuItem = new LeftMenuItem();
    leftMenuItem.mapFromPolicy(policy);
    return leftMenuItem;
  }
}
