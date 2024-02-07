import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { AuthErrorModel } from '../models/auth-error.model';
import { AppStorageService } from '@erp/angular/logic';
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslocoModule,
  ],
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(
    public readonly translocoService: TranslocoService,
    public appStorgate: AppStorageService,
    private readonly fb: FormBuilder,
    private readonly route: Router,
  ) { }

  // Component data variable
  public loginForm!: FormGroup;

  // Ui variable
  public isWaitingForLogin = false;
  public showErrorLabelInput: boolean = false;
  public showErrorWhenSubmit: boolean = false;

  public errorMessageTranslated: string = '';

  public AUTH_ERROR_CODE = AuthErrorModel.ERROR_CODE;

  public currentErrorCode = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
      app: ['', Validators.required],
      reCapcha: [true, Validators.requiredTrue]
    },);

    this.loginForm.valueChanges.subscribe(() => {
      if (this.errorMessageTranslated && this.showErrorLabelInput) {
        this.showErrorLabelInput = false;
      }
    })
  }

  onLogin() {
    // console.log(this.loginForm.getRawValue());
    // if (this.loginForm.invalid) { this.showErrorWhenSubmit = true };
    // if (this.isWaitingForLogin || this.loginForm.invalid) {
    //   return;
    // }

    // this.errorMessageTranslated = '';

    // this.isWaitingForLogin = true;

    // const { username, password, app } = this.loginForm.value;

    // this.authService.login(username, password, app).subscribe({
    //   next: (value) => {
    //     this.router.navigateToPreviousPage();
    //   },
    //   error: (err) => {
    //     this.handleErrorWhenLogin(err);
    //     this.showErrorLabelInput = true;
    //     this.isWaitingForLogin = false;
    //   },
    // })
  }
  handleErrorWhenLogin(err: Error) {
    // const pathLanguageBuilder = (path: string[]) => {
    //   return ['component', 'login', 'errors', ...path].join('.')
    // }

    // this.currentErrorCode = err.message;

    // switch (err.message) {
    //   case AuthErrorModel.ERROR_CODE.ACCOUNT_INACTIVE:
    //     this.errorMessageTranslated = pathLanguageBuilder(['accountInactive']);
    //     break;

    //   case AuthErrorModel.ERROR_CODE.ACCOUNT_LOCKED:
    //     this.errorMessageTranslated = pathLanguageBuilder(['accountLocked']);;
    //     break;

    //   case AuthErrorModel.ERROR_CODE.ACCOUNT_NOT_EXISTED:
    //     this.errorMessageTranslated = pathLanguageBuilder(['accountNotExist']);
    //     break;

    //   case AuthErrorModel.ERROR_CODE.NOT_ALLOW_TO_LOGIN:
    //     this.errorMessageTranslated = pathLanguageBuilder(['notAllowtoLogin']);
    //     break;

    //   case AuthErrorModel.ERROR_CODE.WRONG_PASSWORD:
    //     this.errorMessageTranslated = pathLanguageBuilder(['wrongPassword']);
    //     break;

    //   default:
    //     this.errorMessageTranslated = languagePathBuilder(['shared', 'errors', 'internalServerError']);
    //     break;
    // }

    // if (this.showReCapcha()) {
    //   this.loginForm.get('reCapcha')?.setValue(false);
    // }
  }

  showReCapcha() {
    // return this.authService.getLoginCountError() >= this._LOGIN_COUNT_ERROR_LIMIT_TO_ENABLE_CAPCHA;
  }

  setApp($event: any) {
    this.loginForm.get('app')?.setValue($event);
  }

  resolvedRecapCha(captchaResponse: string | null) {
    this.loginForm.get('reCapcha')?.setValue(true);
  };

  navigateToForgotPassword() {
    this.route.navigate(['/quen-mat-khau'])
  }

  navigateToRegister() {
    this.route.navigate(['/register'])
  }


  // Đối với nghiệp vụ tạp chí phát triển hội nhập - lkích hoạt tài khoản là gửi email
  /// Còn với nhửng ứng dụng khác có thể gửi email hoăạc gửi OTP ...
  navigateToActiveAccountPage() {
    this.route.navigate([`/account-confirm/${this.loginForm.get('username')?.value}/send`])
  }
}
