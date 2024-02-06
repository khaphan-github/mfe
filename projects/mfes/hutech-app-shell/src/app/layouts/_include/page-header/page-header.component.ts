import { Component } from '@angular/core';
import { PanelServiceService } from '../panel-service.service';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {
  constructor(
    private readonly panelService: PanelServiceService,
  ) { }

  // user info
  userInfo: any;

  onLogout() {
    // this.router.navigateToLoginPageAsync().then(() => {
    //   this.authService.logout();
    // });
  }

  ngAfterContentChecked() {
    this.userInfo = this.panelService.getUserInfo();
  }
}
