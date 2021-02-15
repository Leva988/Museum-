import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRefComponent } from './history-ref.component';

describe('Polygraphy', () => {
  let component: HistoryRefComponent;
  let fixture: ComponentFixture<HistoryRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
