/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ZaaSortComponent } from './zaa-sort.component';

describe('ZaaSortComponent', () => {
  let component: ZaaSortComponent;
  let fixture: ComponentFixture<ZaaSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZaaSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaaSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
