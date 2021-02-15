import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyBossesComponent } from './company-bosses.component';

describe('CompanyBossesComponent', () => {
  let component: CompanyBossesComponent;
  let fixture: ComponentFixture<CompanyBossesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyBossesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyBossesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
