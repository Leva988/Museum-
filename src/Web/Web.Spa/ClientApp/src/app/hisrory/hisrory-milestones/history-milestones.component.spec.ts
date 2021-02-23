import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryMilestonesComponent } from './history-milestones.component';

describe('HistoryMilestone', () => {
  let component: HistoryMilestonesComponent;
  let fixture: ComponentFixture<HistoryMilestonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryMilestonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
