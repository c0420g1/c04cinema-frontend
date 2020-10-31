import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../model/Movie';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly API_URL_NEWS = 'http://localhost:8080/news';
  private readonly API_URL_NEWS_2 = 'http://localhost:8080/news2';

  constructor(private http: HttpClient) { }

//get News List and Search that disable pageable
  getListNews(search: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL_NEWS + '?search=' +search);
  }
  //get News List and Search that able pageable
  getAllNews(pageNum: number, search: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.API_URL_NEWS + '/' + pageNum +'?search=' + search);
  }

}
