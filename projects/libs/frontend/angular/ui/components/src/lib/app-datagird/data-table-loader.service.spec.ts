/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataTableLoaderService } from './data-table-loader.service';

describe('Service: DataTableLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTableLoaderService]
    });
  });

  it('should ...', inject([DataTableLoaderService], (service: DataTableLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
