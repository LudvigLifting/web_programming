import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LthComponent } from './lth.component';

describe('LthComponent', () => {
  let component: LthComponent;
  let fixture: ComponentFixture<LthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
