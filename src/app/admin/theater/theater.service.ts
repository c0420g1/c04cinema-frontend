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
  private readonly API_URL_HALLS = 'http://localhost:8080/hall/list';
  private readonly API_URL_HALLS_SEARCH = 'http://localhost:8080/hall/search';
  private readonly API_URL_HALL_TYPE = 'http://localhost:8080/hall_type';
  private readonly API_URL_LOCATIONS = 'http://localhost:8080/location';
  private readonly API_URL_SEATS = 'http://localhost:8080/seat';
  private readonly API_URL_SEAT_TYPE = 'http://localhost:8080/seat_type';

  constructor(private http: HttpClient) { }
  getAllTheater(params): Observable<Theatre[]>{
    return this.http.get<Theatre[]>(this.API_URL_THEATERS, {params});
  }

  getAllLocation(): Observable<Location[]>{
    return this.http.get<Location[]>(this.API_URL_LOCATIONS);
  }

  getAllHallType(): Observable<HallType[]>{
    return this.http.get<HallType[]>(this.API_URL_HALL_TYPE);
  }

  getAllHall(page,theaterId , pageSize): Observable<Hall[]>{
    return this.http.get<Hall[]>(this.API_URL_HALLS + '/?page=' + page + '&theatreId=' + theaterId +'&pageSize=' +pageSize);
  }

  getAllHallSearch(page,theaterId, titleSearch , pageSize): Observable<Hall[]>{
    return this.http.get<Hall[]>(this.API_URL_HALLS_SEARCH + '/?page=' + page + '&theatreId=' + theaterId + '&hallTitle=' + titleSearch +'&pageSize=' + pageSize);
  }

  getHall(id: number): Observable<Hall>{
    return this.http.get<Hall>(`${this.API_URL_HALLS}/${id}`);
  }

  addHall(hall: Partial<Hall>): Observable<Hall>{
    return this.http.post<Hall>(this.API_URL_HALLS, hall);
  }

  editHall(hall: Hall) {
    return this.http.patch<Hall>(`${this.API_URL_HALLS}/${hall.id}`, hall);
  }

  deleteHall(id: number) : Observable<any> {
    return this.http.delete(`${this.API_URL_HALLS}/${id}`);
  }

  getAllSeatType(): Observable<SeatType[]>{
    return this.http.get<SeatType[]>(this.API_URL_SEAT_TYPE);
  }

  getAllSeat(hall): Observable<Seat[]>{
    return this.http.get<Seat[]>(this.API_URL_SEATS, {params: hall});
  }

  addSeat(seat: Partial<Seat>): Observable<Seat>{
    return this.http.post<Seat>(this.API_URL_HALLS, seat);
  }

  editSeat(seat: Seat) {
    return this.http.patch<Seat>(`${this.API_URL_SEATS}/${seat.id}`, seat);
  }
}
