import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrls: ['./guest-layout.component.css']
})
export class GuestLayoutComponent implements AfterViewInit, OnInit {

  constructor() { }

  ngOnInit(): void {
    // console.log('vao guest------1')
    // this.themeSettingsService.loadThemeSettings();
  }
  ngAfterViewInit() {
    // this.themeSettingsService.loadThemeSettings();
  }
}
