import { Injectable } from '@angular/core';
import {BookingTicket} from '../model/bookingTicket';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookingTicketDTO} from '../model/bookingTicketDTO';
import {ConfirmTicket} from '../model/confirmTicket';

@Injectable({
  providedIn: 'root'
})
export class BookingTicketService {

  private readonly API_URL_TICKET = ' http://localhost:8080/booking_ticket_dto';
  private readonly API_URL_TICKET_CONFIRM = ' http://localhost:8080/booking_ticket';
  private readonly API_URL_CONFIRM = ' http://localhost:8080/confirmTicket';
  private readonly API_URL_GET_QUANTITY = ' http://localhost:8080/getQuantity';

  constructor(private http: HttpClient) { }

  getAllTicket(pageNum: number, search: string): Observable<BookingTicketDTO[]>{
    return this.http.get<BookingTicketDTO[]>(this.API_URL_TICKET + '/' + pageNum +'?search=' + search);
  }

  getListTicket(search: string): Observable<BookingTicketDTO[]>{
    return this.http.get<BookingTicketDTO[]>(this.API_URL_TICKET + '?search=' +search);
  }

  findTicketById(id: number): Observable<BookingTicket>{
    return this.http.get<BookingTicket>(this.API_URL_TICKET_CONFIRM + '?filter=%7B%22property%22:%22id%22,%22operator%22:%22eq%22,%22value%22:'+id+'%7D');
  }
  confirmTicket(ticket: ConfirmTicket, point: number): Observable<void>{
    return  this.http.patch<void>(this.API_URL_CONFIRM +'/'+point, ticket);
  }
  getQuantity(showId: number, accountId: number): Observable<BookingTicketDTO[]>{
    return this.http.get<BookingTicketDTO[]>(this.API_URL_GET_QUANTITY + '?showId=' +showId + '&accountId=' +accountId);
  }
}
