import { APIDataHandler } from "@core/models/api-data-handler.interface";

export type CompanyModel = {
  id: number;
  name: string;
  disabled: boolean;
};

export class CompanyDataHandler implements APIDataHandler<CompanyModel[]> {
  private dataMapped: CompanyModel[] = [];

  constructor(args?: any) {
    this.dataMapped = args;
  }
  mapDataFromAPI(response?: any): CompanyModel[] {
    return this.dataMapped;
  }
}
