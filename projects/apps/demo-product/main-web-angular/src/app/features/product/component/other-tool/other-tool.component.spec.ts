/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OtherToolComponent } from './other-tool.component';

describe('OtherToolComponent', () => {
  let component: OtherToolComponent;
  let fixture: ComponentFixture<OtherToolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherToolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
