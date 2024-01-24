/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PanelServiceService } from './panel-service.service';

describe('Service: PanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanelServiceService]
    });
  });

  it('should ...', inject([PanelServiceService], (service: PanelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
