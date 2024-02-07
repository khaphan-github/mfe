import { AfterViewInit, Component, OnInit, VERSION, inject, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SmartAdminConfigService } from '@erp/angular/components';

@Component({
  standalone: true,
  selector: 'erp-root',
  imports: [
    RouterOutlet,
  ],
  providers: [
    SmartAdminConfigService,
  ],
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit, AfterViewInit {
  smartAdminConfigService = inject(SmartAdminConfigService);

  ngOnInit() {
    isDevMode() && console.log(`Angular ${VERSION.full}`)
  }

  ngAfterViewInit(): void {
    this.smartAdminConfigService.activeJsAppComponent()
  }
}
