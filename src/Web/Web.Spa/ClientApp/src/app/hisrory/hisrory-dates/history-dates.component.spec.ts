import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDatesComponent } from './history-dates.component';

describe('Polygraphy', () => {
  let component: HistoryDatesComponent;
  let fixture: ComponentFixture<HistoryDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
