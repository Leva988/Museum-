import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryVideoComponent } from './gallery-video.component';

describe('GalleryVideoComponent', () => {
  let component: GalleryVideoComponent;
  let fixture: ComponentFixture<GalleryVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
