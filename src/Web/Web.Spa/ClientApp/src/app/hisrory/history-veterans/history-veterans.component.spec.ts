import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryVeteransComponent } from './history-veterans.component';

describe('Polygraphy', () => {
  let component: HistoryVeteransComponent;
  let fixture: ComponentFixture<HistoryVeteransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryVeteransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryVeteransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
