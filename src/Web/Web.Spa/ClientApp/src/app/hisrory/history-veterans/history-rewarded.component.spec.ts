import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRewardedComponent } from './history-rewarded.component';

describe('HistoryRewardedComponent', () => {
  let component: HistoryRewardedComponent;
  let fixture: ComponentFixture<HistoryRewardedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRewardedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRewardedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
