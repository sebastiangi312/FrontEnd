import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyChargesComponent } from './verify-charges.component';

describe('VerifyChargesComponent', () => {
  let component: VerifyChargesComponent;
  let fixture: ComponentFixture<VerifyChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
