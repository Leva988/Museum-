import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyIndicatorsComponent } from './company-indicators.component';

describe('CompanyIndicatorsComponent', () => {
  let component: CompanyIndicatorsComponent;
  let fixture: ComponentFixture<CompanyIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
