import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerSingleComponent } from './date-picker-single.component';

describe('DatePickerSingleComponent', () => {
  let component: DatePickerSingleComponent;
  let fixture: ComponentFixture<DatePickerSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerSingleComponent]
    });
    fixture = TestBed.createComponent(DatePickerSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
