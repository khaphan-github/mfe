import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DatePickerMatComponent } from './date-picker-mat/date-picker-mat.component';
import { DatePickerRangeComponent } from './date-picker-range/date-picker-range.component';
import { DatePickerSingleComponent } from './date-picker-single/date-picker-single.component';

import { MatNativeDateModule } from '@angular/material/core';
import { SmartAdminConfigService } from '../../smart-admin-config.service';

@NgModule({
  declarations: [
    DatePickerSingleComponent,
    DatePickerRangeComponent,
    DatePickerMatComponent,
  ],
  exports: [
    DatePickerSingleComponent,
    DatePickerRangeComponent,
    DatePickerMatComponent,
  ],
  providers: [
    SmartAdminConfigService,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
})
export class DatePickerComponentModule { }
