import { TestBed } from '@angular/core/testing';

import { EntryService } from './entry.service';

describe('EntryServiceService', () => {
  let service: EntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
