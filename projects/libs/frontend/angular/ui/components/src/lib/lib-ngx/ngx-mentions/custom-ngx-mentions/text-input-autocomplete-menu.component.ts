import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'ngx-text-input-autocomplete-menu',
  template: `
  <ul class="dropdown-menu fadeinleft show display-menu "
    id="template-menu-mention"
    ngxKbListNavigation
    (selectChoice)="emitChoice($event)"

    *ngIf="choices?.length"
    [choices]="choices"
    [style.top.px]="position?.top"
    [style.left.px]="position?.left">

    <li class="dropdown-item"
      *ngFor="let choice of choices;
      trackBy:trackById;"
      (click)="emitChoice(choice)"
      >

      <ng-template #defaultSelectorTmpl>
        <span>{{ choice[displayAtribute] }}</span>
      </ng-template>
      <ng-container
        [ngTemplateOutlet]="selectorTemplateOutlet || defaultSelectorTmpl"
        [ngTemplateOutletContext]="{ $implicit: choice }"
      ></ng-container>
    </li>
  </ul>
  `,
  styles: [`
    .display-menu {
      max-height: 250px;
      overflow: auto
    }
  `]
})
export class TextInputAutocompleteMenuComponent {
  @Input() selectorTemplateOutlet!: TemplateRef<any> | undefined;
  @Input() displayAtribute: string = '';
  @Input() choices!: any[];

  @Output() selectChoice = new EventEmitter<any>();

  constructor() { }

  position: { top: number; left: number } | undefined;
  activeChoice: any;

  protected trackById = (index: number, choice: any) =>
    (typeof choice.id !== 'undefined' ? choice.id : choice);

  emitChoice = (choice: any) => this.selectChoice.emit(choice);

}
