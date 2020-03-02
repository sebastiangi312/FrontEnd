import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedListComponent } from './verified-list.component';

describe('VerifiedListComponent', () => {
  let component: VerifiedListComponent;
  let fixture: ComponentFixture<VerifiedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
