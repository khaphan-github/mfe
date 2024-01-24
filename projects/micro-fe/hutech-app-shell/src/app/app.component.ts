import { AfterViewInit, Component, OnInit, VERSION, inject, isDevMode } from '@angular/core';
import { SmartAdminConfigService } from './smart-admin-config.service';
import { RouterOutlet } from '@angular/router';

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
  private readonly smartAdminConfigService = inject(SmartAdminConfigService);

  ngOnInit() {
    if (isDevMode()) {
      console.group(`Angular ${VERSION.full} Running in [development] mode`);
      console.groupEnd();
    }
  }

  ngAfterViewInit(): void {
    this.smartAdminConfigService.activeJsAppComponent()
  }
}
