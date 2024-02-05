import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';

export interface IGroupButton {
  id: string;
  displayText: string;
  icon?: string;
  metadata?: any;
};

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
  ],
  selector: 'app-zaa-group-button',
  templateUrl: './zaa-group-button.component.html',
  styleUrls: ['./zaa-group-button.component.css']
})
export class ZaaGroupButtonComponent {
  @Input() options: Array<IGroupButton> = [];
  @Input() currentSelected: Array<IGroupButton> = [];
  @Input() allowMany: boolean = false;
  @Input() enableLanguage: boolean = false;
  @Input() label: string = '';
  @Input() buttonClass: string = 'btn btn-default waves-effect waves-themed ng-star-inserted';

  @Output() choose = new EventEmitter<Array<IGroupButton>>();
  onChoose(option: IGroupButton) {

    if (this.allowMany) {
      const selectedOptions = Array.isArray(this.currentSelected) ? this.currentSelected : [];

      const index = selectedOptions.findIndex((o) => o.id === option.id);

      if (index !== -1) {
        selectedOptions.splice(index, 1);
      } else {
        selectedOptions.push(option);
      }
      this.currentSelected = selectedOptions;
      this.choose.emit(selectedOptions);
    } else {
      this.currentSelected = [option];
      this.choose.emit([option]);
    }
  }

  isActive(option: IGroupButton) {
    const selectedOptions = Array.isArray(this.currentSelected) ? this.currentSelected : [];
    return selectedOptions.some((o) => o.id === option.id);
  }

}
