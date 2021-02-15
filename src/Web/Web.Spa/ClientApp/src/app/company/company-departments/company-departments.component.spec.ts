import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDepartmentsComponent } from './company-departments.component';

describe('CompanyDepartmentsComponent', () => {
  let component: CompanyDepartmentsComponent;
  let fixture: ComponentFixture<CompanyDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
