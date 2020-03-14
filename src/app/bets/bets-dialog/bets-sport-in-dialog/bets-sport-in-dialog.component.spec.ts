import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsSportInDialogComponent } from './bets-sport-in-dialog.component';

describe('BetsSportInDialogComponent', () => {
  let component: BetsSportInDialogComponent;
  let fixture: ComponentFixture<BetsSportInDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsSportInDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsSportInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
