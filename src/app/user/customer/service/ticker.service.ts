import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Ticker} from '../model/Ticker';
import {Error1} from '../model/error1';

@Injectable({
  providedIn: 'root'
})
export class TickerService {


  private readonly API_URL1 = 'http://localhost:8080/showTickerList';
  private readonly API_URL2 = 'http://localhost:8080/showTickerListPage';
  private readonly API_URL3 = 'http://localhost:8080/editTicket';
  constructor(private http: HttpClient) {}

  getTickerById(id: string,page: number,cancel: number): Observable<Ticker[]> {
    return this.http.get<Ticker[]>(`${this.API_URL1}/${id}/${page}/${cancel}`);
  }

  getTickerByListId(id: string,cancel: number): Observable<Ticker[]> {
    return this.http.get<Ticker[]>(`${this.API_URL2}/${id}/${cancel}`);
  }

  pathTicker(id: string,idTicker: number): Observable<Error1[]> {
    return this.http.get<Error1[]>(`${this.API_URL3}/${id}?idTicker=${idTicker}`);
  }
}
