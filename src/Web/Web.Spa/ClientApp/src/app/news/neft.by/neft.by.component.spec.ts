import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeftByComponent } from './neft.by.component';

describe('NeftByComponent', () => {
  let component: NeftByComponent;
  let fixture: ComponentFixture<NeftByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeftByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeftByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
