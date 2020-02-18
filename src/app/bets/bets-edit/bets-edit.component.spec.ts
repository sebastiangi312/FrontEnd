import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsEditComponent } from './bets-edit.component';

describe('BetsEditComponent', () => {
  let component: BetsEditComponent;
  let fixture: ComponentFixture<BetsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
