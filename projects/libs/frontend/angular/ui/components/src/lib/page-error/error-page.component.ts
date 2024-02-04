import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from 'lodash';
import { Subscription } from 'rxjs';
import { JWTHelpler } from '../zaa-notication/helpers/jwt/jwt.helper';
import { AppRoutingService } from 'src/app/core/routing/app-routing.service';
import { AppStorageService, StorageLocation } from 'src/app/core/app-store/app-storage.service';
import { LocalStorageConfigKeys } from 'src/app/config/app-storage/local-storage.config';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
})
export class ErrorPageComponent implements OnInit {
  private readonly localStorageScope = LocalStorageConfigKeys.feature.auth;
  private routerQueryParams$!: Subscription;

  errorLabel: any;
  title: any;
  statusCode: any;
  message: any;
  desc: any;
  goBackButtonText: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: AppRoutingService,
    private readonly storage: AppStorageService,
  ) { }

  ngOnInit() {
    this.routerQueryParams$ = this.getQueryParamsSubject();
  }

  ngOnDestroy(): void {
    this.routerQueryParams$?.unsubscribe();
  }

  private getQueryParamsSubject = () => {
    return this.route.queryParams.subscribe(params => {
      let statusCode = parseInt(params['s'], 10);

      // Kiểm tra xem statusCode có hợp lệ (403 hoặc 500)
      const isRightStatusCode = statusCode !== undefined
        && _.includes([403, 500], statusCode);

      // Nếu statusCode hợp lệ, lấy dữ liệu lỗi được dịch (transloco)
      // Nếu không, lấy dữ liệu lỗi được dịch (transloco) cho trang 404
      if (isRightStatusCode) {
        this.getTranslate(statusCode);
      } else {
        this.getTranslate('404Page');
      }
    })
  }

  /**
   * getTranslate để lấy dữ liệu lỗi được dịch (transloco) dựa trên statusCode.
   * @param statusCode Mã trạng thái của lỗi (ví dụ: 403, 404, 500)
   */
  private getTranslate = (statusCode: any) => {
    this.statusCode = `error.${statusCode}.status`;
    this.message = `error.${statusCode}.message`;
    this.desc = `error.${statusCode}.desc`;
    this.title = `error.${statusCode}.title`;
  }

  /**
  * Hàm để chuyển hướng đến trang chủ hoặc trang đăng nhập dựa vào tính hợp lệ của JWT
  */
  navigateToHome = () => {
    // Kiểm tra xem JWT trong bộ nhớ cục bộ có hợp lệ hay không
    const token = this.storage.getItem(
      this.localStorageScope.accessToken,
      { location: StorageLocation.LOCAL_STORAGE }
    );

    if (new JWTHelpler().idValid(token)) {
      this.router.navigateToHomePage();
    } else {
      console.log('Return login page');
      this.router.navigateToLoginPage();
    }
  }
}
