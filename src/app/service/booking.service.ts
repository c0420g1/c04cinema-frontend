import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../model/Booking';
import { BookingTicketDTO } from '../model/bookingTicketDTO';
import { BookingTimeDTO } from '../model/BookingTimeDTO';
import { Location } from '../model/location';
import { Seat } from '../model/seat';
import { SeatType } from '../model/seatType';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_URL_LOCATION = 'http://localhost:8080/location';
  private readonly API_URL_BOOKING_TIME = 'http://localhost:8080/bookingTime/';
  private readonly API_URL_SEATHALL = 'http://localhost:8080/seatShow';
  private readonly API_URL_SEATTYPE = 'http://localhost:8080/seat_type';
  private readonly API_URL_BOOKING = 'http://localhost:8080/booking_ticket';
  private readonly API_URL_UPDATEBONUS = 'http://localhost:8080/bookingUpdateBonus';
  private readonly API_URL_USEBONUS = 'http://localhost:8080/promotionDiscount';
  private readonly API_URL_SEATNAME = 'http://localhost:8080/getSeatNameById/';
  private readonly API_URL_COMBO = 'http://localhost:8080/food_drink';
  constructor(private http: HttpClient) { }

  getAllLocation(): Observable<Location[]>{
    return this.http.get<Location[]>(this.API_URL_LOCATION);
  }

  getBookingTime(id: number, movieId: number, dateShow: string): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL_BOOKING_TIME + id + '?movieId=' + movieId +'&dateShow='+ dateShow);
  }

  getSeat(showId: number): Observable<Seat[]>{
    return this.http.get<Seat[]>(this.API_URL_SEATHALL + '/' + showId);
  }

  getSeatType(): Observable<SeatType[]>{
    return this.http.get<SeatType[]>(this.API_URL_SEATTYPE);
  }

  booking(booking: Booking): Observable<string[]>{
    return this.http.post<string[]>(this.API_URL_BOOKING, booking);
  }

  bookingUpdateBonus(cusId: number, bonusPoint: number): Observable<void>{
    return this.http.get<void>(this.API_URL_UPDATEBONUS + '?cusId='+ cusId + '&bonusPoint='+ bonusPoint);
  }

  bookingUseBonus(accId: number, proCode: string): Observable<number>{
    return this.http.get<number>(this.API_URL_USEBONUS  + '?accId='+ accId + '&proCode='+ proCode);
  }

  bookingGetSeatName(seatId: number): Observable<string>{
    return this.http.get<string>(this.API_URL_SEATNAME + seatId);
  }

  bookingGetCombo(): Observable<any>{
    return this.http.get<any[]>(this.API_URL_COMBO);
  }
}
