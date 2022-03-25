import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineNodeComponent } from './timeline-node.component';

describe('TimelineNodeComponent', () => {
  let component: TimelineNodeComponent;
  let fixture: ComponentFixture<TimelineNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
