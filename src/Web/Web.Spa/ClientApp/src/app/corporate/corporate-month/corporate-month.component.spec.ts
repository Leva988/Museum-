import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateMonthComponent } from './corporate-month.component';

describe('CorporateMonthComponent', () => {
  let component: CorporateMonthComponent;
  let fixture: ComponentFixture<CorporateMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporateMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
