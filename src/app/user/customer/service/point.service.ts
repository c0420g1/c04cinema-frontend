import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Point} from '../model/Point';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  private readonly API_URL1 = 'http://localhost:8080/showPointPlusList/page';
  private readonly API_URL2 = 'http://localhost:8080/showPointUseList/page';
  constructor(private http: HttpClient) {}

  getTickerPlusById(id: number,page: number,date_star :string,date_end :string): Observable<Point[]> {
    return this.http.get<Point[]>(`${this.API_URL1}/${page}?id=${id}&star_date=${date_star}T07:00:00&end_date=${date_end}T07:00:00`);
  }
  getTickerListPlusById(id: number,date_star :string,date_end :string): Observable<Point[]> {
    return this.http.get<Point[]>(`${this.API_URL1}/?id=${id}&star_date=${date_star}T07:00:00&end_date=${date_end}T07:00:00`);
  }

  getTickerUseById(id: string,page: number,date_star :string,date_end :string): Observable<Point[]> {
    return this.http.get<Point[]>(`${this.API_URL2}/${page}?id=${id}&star_date=${date_star}T07:00:00&end_date=${date_end}T07:00:00`);
  }

  getTickerListUseById(id: string,date_star :string,date_end :string): Observable<Point[]> {
    return this.http.get<Point[]>(`${this.API_URL2}/?id=${id}&star_date=${date_star}T07:00:00&end_date=${date_end}T07:00:00`);
  }
}
