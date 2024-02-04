import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerMatComponent } from './date-picker-mat.component';

describe('DatePickerMatComponent', () => {
  let component: DatePickerMatComponent;
  let fixture: ComponentFixture<DatePickerMatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatePickerMatComponent]
    });
    fixture = TestBed.createComponent(DatePickerMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
