import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SmartAdminConfigService } from '../../smart-admin-config.service';

@Component({
  selector: 'app-mem-layout',
  templateUrl: './mem-layout.component.html',
  styleUrls: ['./mem-layout.component.css']
})
export class MemLayoutComponent implements OnInit, AfterViewInit {
  constructor(
    private smartAdminConfigService: SmartAdminConfigService,
  ) { }
  ngOnInit(): void {
    // console.log('mem init');
  }
  ngAfterViewInit(): void {
    // console.log('mem after ');

    // Kích hoạt js cho mem component
    this.smartAdminConfigService.activeJsMemComponent()
  }
}
