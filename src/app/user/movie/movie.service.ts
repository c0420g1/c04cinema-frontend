import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../model/Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_URL = 'http://localhost:8080/movie?filter=';
  private readonly API_URL2 = 'http://localhost:8080/movie/date/';
  private readonly API_URL3 = 'http://localhost:8080/movie-new';

  constructor(private http: HttpClient) {
  }

  endCodeDate(property: string, operator: string, value: string) {
    const filter = '{"property":"' + property + '","operator":"' + operator + '","value":"' + value + '"}';
    return encodeURI(filter);
  }

  getAll(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.API_URL);
  }
  getMovieByDate(date: string): Observable<Movie[]> {
    // return this.http.get<Movie[]>(this.API_URL + this.endCodeDate('startDate', 'ge', date) + this.endCodeDate('startDate', 'le', date));
    return this.http.get<Movie[]>(this.API_URL2 + date);

  }
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(this.API_URL + this.endCodeDate('id','eq', id));
  }
  getFilmByName(name:string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL + this.endCodeDate('name','like', name))
  }
  getMoviesNew(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL3);
  }
}
