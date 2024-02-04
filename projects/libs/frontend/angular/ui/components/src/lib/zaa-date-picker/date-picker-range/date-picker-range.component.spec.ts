import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerRangeComponent } from './date-picker-range.component';

describe('DatePickerRangeComponent', () => {
  let component: DatePickerRangeComponent;
  let fixture: ComponentFixture<DatePickerRangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerRangeComponent]
    });
    fixture = TestBed.createComponent(DatePickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
