import { TestBed } from '@angular/core/testing';

import { BookingTicketService } from './booking-ticket.service';

describe('BookingTicketService', () => {
  let service: BookingTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
