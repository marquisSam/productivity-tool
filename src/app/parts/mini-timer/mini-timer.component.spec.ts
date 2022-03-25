import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTimerComponent } from './mini-timer.component';

describe('MiniTimerComponent', () => {
  let component: MiniTimerComponent;
  let fixture: ComponentFixture<MiniTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
