import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  selector: 'erp-app-not-found-data',
  template: `
    <div *ngIf="show">
      <div class="alert alert-primary" role="alert" *transloco="let translated;">
          <div class="d-flex align-items-center">
              <div class="alert-icon">
                  <i class="fal fa-info-circle"></i>
              </div>
              <div class="flex-1">
                <strong class="text-uppercase">
                  {{translated(PATH_TRANSLATE + 'khong_co_du_lieu')}}!
                </strong>
                <br>
                <span>{{translated(PATH_TRANSLATE + 'yeu_cau')}}</span>
                <strong> {{time}}</strong>
                <span class="text-lowercase"> {{translated(PATH_TRANSLATE + 'ngay')}}</span>
                <strong> {{day}}</strong>
                <span class="text-lowercase"> {{translated(PATH_TRANSLATE + 'khong_tim_thay_du_lieu')}}</span>.
              </div>
          </div>
      </div>
    </div>
  `,
})
export class NotFoundDataComponent {
  @Input() show: boolean = false;
  @Input() iconPath!: string;
  @Input() title!: string;
  @Input() desc!: string;
  time: string = '';
  day: string = '';
  readonly PATH_TRANSLATE = "shared.components.app_not_found_data.";

  public readonly DEFAULT_ICON_PATH =
    'assets/img/image/con-heo-cham-hoi-light.svg';
}
