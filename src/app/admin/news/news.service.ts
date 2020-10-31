import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../model/Movie';
import {News} from '../../model/News';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private readonly API_URL_NEWS = 'http://localhost:8080/other';
  private readonly API_URL_NEWS_2 = 'http://localhost:8080/news2';

  constructor(private http: HttpClient) { }

//get News List and Search that disable pageable
  getListNews(search: string): Observable<News[]>{
    return this.http.get<News[]>(this.API_URL_NEWS_2 + '?search=' +search);
  }
  //get News List and Search that able pageable
  getAllNews(pageNum: number, search: string): Observable<News[]>{
    return this.http.get<News[]>(this.API_URL_NEWS_2 + '/' + pageNum +'?search=' + search);
  }

  // add new News
  addNews(news: News): Observable<News>{
    return this.http.post<News>(this.API_URL_NEWS, news);
  }

  //edit News
  editNews(news: News, id: number): Observable<News> {
    return this.http.patch<News>(this.API_URL_NEWS + '/' +  id, news);
  }

  //delete News
  deleteNews(id: number): Observable<News>{
    return this.http.delete<News>(this.API_URL_NEWS + '/' + id);
  }
}
