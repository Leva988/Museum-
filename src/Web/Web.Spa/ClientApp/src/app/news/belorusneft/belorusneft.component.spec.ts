import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BelorusneftComponent } from './belorusneft.component';

describe('BelorusneftComponent', () => {
  let component: BelorusneftComponent;
  let fixture: ComponentFixture<BelorusneftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BelorusneftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BelorusneftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
