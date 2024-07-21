import { TestBed } from '@angular/core/testing';

import { StyleClassService } from './style-class.service';

describe('StyleClassService', () => {
  let service: StyleClassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleClassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
