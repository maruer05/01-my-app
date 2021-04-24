import { TestBed } from '@angular/core/testing';

import { MensajesServicesSocketService } from './mensajes-services-socket.service';

describe('MensajesServicesSocketService', () => {
  let service: MensajesServicesSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensajesServicesSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
