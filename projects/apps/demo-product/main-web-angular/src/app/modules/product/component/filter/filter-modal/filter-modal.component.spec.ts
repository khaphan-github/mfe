import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FiltersModalComponent } from "./filter-modal.component";

describe('Test product filter modal component', () => {
  let fixture: ComponentFixture<FiltersModalComponent>;
  let component: FiltersModalComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersModalComponent],
    });

    fixture = TestBed.createComponent(FiltersModalComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  })
}) 