import { TestBed } from '@angular/core/testing';

import { ActionNodeService } from './action-node.service';

describe('ActionNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionNodeService = TestBed.get(ActionNodeService);
    expect(service).toBeTruthy();
  });
});
