import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillScoreboardsComponent } from './fill-scoreboards.component';

describe('FillScoreboardsComponent', () => {
  let component: FillScoreboardsComponent;
  let fixture: ComponentFixture<FillScoreboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillScoreboardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillScoreboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
