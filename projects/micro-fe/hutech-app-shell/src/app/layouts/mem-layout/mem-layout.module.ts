import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemLayoutComponent } from './mem-layout.component';
import { MemLayoutRoutingModule } from './mem-layout.routing.module';
import { TopBarComponent } from '../_include/app-top-bar/app-top-bar.component';
import { LeftPanelComponent } from '../_include/left-panel/left-panel.component';
import { PageHeaderComponent } from '../_include/page-header/page-header.component';
import { PageSettingComponent } from '../_include/page-setting/page-setting.component';
import { TabSettingComponent } from '../_include/page-setting/tab-setting/tab-setting.component';
import { SmartAdminConfigService } from '../../smart-admin-config.service';



@NgModule({
  declarations: [
    MemLayoutComponent,
    TopBarComponent,
    LeftPanelComponent,
    PageHeaderComponent,
    PageSettingComponent,
    TabSettingComponent,
  ],
  imports: [
    CommonModule,
    MemLayoutRoutingModule,
  ],
  providers: [SmartAdminConfigService,]
})
export class MemLayoutModule { }
