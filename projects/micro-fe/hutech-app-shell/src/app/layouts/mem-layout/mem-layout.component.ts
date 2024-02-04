import { AfterViewInit, Component } from '@angular/core';
import { SmartAdminConfigService } from '../../smart-admin-config.service';

@Component({
  selector: 'erp-mem-layout',
  templateUrl: './mem-layout.component.html',
  styleUrls: ['./mem-layout.component.css']
})
export class MemLayoutComponent implements AfterViewInit {
  constructor(
    private smartAdminConfigService: SmartAdminConfigService,
  ) { }
  ngAfterViewInit(): void {
    this.smartAdminConfigService.activeJsMemComponent()
  }
}
