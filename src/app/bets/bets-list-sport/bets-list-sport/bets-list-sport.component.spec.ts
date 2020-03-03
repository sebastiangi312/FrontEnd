import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsListSportComponent } from './bets-list-sport.component';

describe('BetsListSportComponent', () => {
  let component: BetsListSportComponent;
  let fixture: ComponentFixture<BetsListSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsListSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsListSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
