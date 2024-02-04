import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextInputAutocompleteComponent } from './text-input-autocomplete.component';
import { TextInputAutocompleteMenuComponent } from '../../custom-ngx-mentions/text-input-autocomplete-menu.component';
import { KbListNavigationDirective } from './kb-list-navigation.directive';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    TextInputAutocompleteComponent,
    TextInputAutocompleteMenuComponent,
    KbListNavigationDirective,
  ],
  imports: [CommonModule, OverlayModule],
  exports: [
    TextInputAutocompleteComponent,
    TextInputAutocompleteMenuComponent,
    KbListNavigationDirective,
  ],
})
export class TextInputAutocompleteModule { }
