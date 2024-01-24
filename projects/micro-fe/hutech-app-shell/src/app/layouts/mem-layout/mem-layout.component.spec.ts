import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemLayoutComponent } from './mem-layout.component';

describe('MemLayoutComponent', () => {
  let component: MemLayoutComponent;
  let fixture: ComponentFixture<MemLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemLayoutComponent]
    });
    fixture = TestBed.createComponent(MemLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
