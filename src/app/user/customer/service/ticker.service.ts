import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Ticker} from '../model/Ticker';

@Injectable({
  providedIn: 'root'
})
export class TickerService {


  private readonly API_URL1 = 'http://localhost:8080/showTickerList';
  private readonly API_URL2 = 'http://localhost:8080/showTickerListPage';
  constructor(private http: HttpClient) {}

  getTickerById(id: string,page: number,cancel: number): Observable<Ticker[]> {
    return this.http.get<Ticker[]>(`${this.API_URL1}/${id}/${page}/${cancel}`);
  }

  getTickerByListId(id: string,cancel: number): Observable<Ticker[]> {
    return this.http.get<Ticker[]>(`${this.API_URL2}/${id}/${cancel}`);
  }
}
