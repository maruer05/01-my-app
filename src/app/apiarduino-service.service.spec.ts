import { TestBed } from '@angular/core/testing';

import { ApiarduinoServiceService } from './apiarduino-service.service';

describe('ApiarduinoServiceService', () => {
  let service: ApiarduinoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiarduinoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
