import { TestBed } from '@angular/core/testing';

import { CandidateserviceService } from './candidateservice.service';

describe('CandidateserviceService', () => {
  let service: CandidateserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
