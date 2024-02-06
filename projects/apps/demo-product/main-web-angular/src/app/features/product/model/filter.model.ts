type FilterResponse = {
  id: number;
  name: string;
};

export class FilterModel {
  private filterData: FilterResponse[] = [];
  constructor(args?: any) {
    this.filterData = args;
  }

  mapDataFromAPI(): any {
    return this.filterData;
  }
}
