import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../model/Movie';
import {Comment} from '../../model/Comment';
import { Customer } from '../customer/model/Customer';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly API_URL_FILTER = 'http://localhost:8080/movie?filter=';
  private readonly API_GET_BY_DATE = 'http://localhost:8080/movie/date/';
  private readonly API_MOV_COMING = 'http://localhost:8080/movie-new';
  private readonly API_MOV_BY_NAME = 'http://localhost:8080/movie/';
  private readonly API_MOV_COM = 'http://localhost:8080/movie-coming/';
  private readonly TOTAL_MOV_COM = 'http://localhost:8080/totalPageComing/';
  private readonly MOV_BEST_CHOICE = 'http://localhost:8080/movie/bestchoise';
  private readonly MOV_COMMENTS = 'http://localhost:8080/comments/';
  private readonly MOV_ADDCOMMENT = 'http://localhost:8080/comment';
  private readonly API_CUSTOMER = 'http://localhost:8080/customer/';
  constructor(private http: HttpClient) {
  }

  endCodeDate(property: string, operator: string, value: string) {
    const filter = '{"property":"' + property + '","operator":"' + operator + '","value":"' + value + '"}';
    return encodeURI(filter);
  }

  getMovieByDate(date: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.API_GET_BY_DATE + date);

  }
  getMovieById(id: string): Observable<Movie> {
    return this.http.get<Movie>(this.API_URL_FILTER + this.endCodeDate('id','eq', id));
  }
  getMoviesNew(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_MOV_COMING);
  }
  getMovieByName(name: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_MOV_BY_NAME + name);
  }
  getMovieComing(pageNum: number, date: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_MOV_COM + pageNum + '?date=' + date);
  }

  getTotalPage(date: string): Observable<number>{
    return this.http.get<number>(this.TOTAL_MOV_COM + date);
  }
  getBestChoiceFilm(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.MOV_BEST_CHOICE);
  }

  getCommentByMovieId(id: string): Observable<any[]> {
    return this.http.get<any[]>(this.MOV_COMMENTS + id);
  }

  getCCustomerByAccountId(accId: string): Observable<Customer> {
    return this.http.get<Customer>(this.API_CUSTOMER + accId);
  }

  addComment(com: Comment): Observable<void>{
    return this.http.post<void>(this.MOV_ADDCOMMENT, com);
  }
}
