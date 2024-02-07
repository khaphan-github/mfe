import { APIDataHandler } from "@erp/angular/logic";

export class AuthModel implements APIDataHandler<AuthModel> {
  listmenu_active: string[] = [];
  result!: any;
  token!: string;

  mapDataFromAPI(args: any) {
    this.listmenu_active = args?.listmenu_active?.map((id: any) => id.toString());
    this.result = args?.result;
    this.token = args?.token;
    return this;
  }
}
