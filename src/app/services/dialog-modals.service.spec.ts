import { TestBed } from '@angular/core/testing';

import { DialogModalsService } from './dialog-modals.service';

describe('DialogModalsService', () => {
  let service: DialogModalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogModalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
