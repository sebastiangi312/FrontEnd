import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsInDialogComponent } from './bets-in-dialog.component';

describe('BetsInDialogComponent', () => {
  let component: BetsInDialogComponent;
  let fixture: ComponentFixture<BetsInDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsInDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsInDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
