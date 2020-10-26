import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Theatre} from '../../model/theatre';
import {Location} from '../../model/location';
import {HallType} from '../../model/hallType';
import {Hall} from '../../model/Hall';
import {SeatType} from '../../model/seatType';
import {Seat} from '../../model/seat';

@Injectable({
  providedIn: 'root'
})
export class TheaterService {
  private readonly API_URL_THEATERS = 'http://localhost:8080/theatre';
  private readonly API_URL_HALLS = 'http://localhost:8080/hall';
  private readonly API_URL_HALL_TYPE = 'http://localhost:8080/hall_type';
  private readonly API_URL_LOCATIONS = 'http://localhost:8080/location';
  private readonly API_URL_SEATS = 'http://localhost:8080/seat';
  private readonly API_URL_SEAT_TYPE = 'http://localhost:8080/seat_type';

  constructor(private http: HttpClient) { }
  getAllTheater(): Observable<Theatre[]>{
    return this.http.get<Theatre[]>(this.API_URL_THEATERS);
  }
  getAllLocation(): Observable<Location[]>{
    return this.http.get<Location[]>(this.API_URL_LOCATIONS);
  }
  getAllHallType(): Observable<HallType[]>{
    return this.http.get<HallType[]>(this.API_URL_HALL_TYPE);
  }
  getAllHall(): Observable<Hall[]>{
    return this.http.get<Hall[]>(this.API_URL_HALLS);
  }
  getAllSeatType(): Observable<SeatType[]>{
    return this.http.get<SeatType[]>(this.API_URL_SEAT_TYPE);
  }
  getAllSeat(): Observable<Seat[]>{
    return this.http.get<Seat[]>(this.API_URL_SEATS);
  }
}
