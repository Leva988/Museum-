import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateYearComponent } from './corporate-year.component';

describe('CorporateYearComponent', () => {
  let component: CorporateYearComponent;
  let fixture: ComponentFixture<CorporateYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
