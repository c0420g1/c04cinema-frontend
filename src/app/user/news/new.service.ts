import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {News} from '../../model/News';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewService {
  private readonly API_NEW = 'http://localhost:8080/news';
  private readonly API_SITEMAP = 'http://localhost:8080/sitemap';
  constructor(private http: HttpClient) { }
  getAllNew(): Observable<News[]>{
    return this.http.get<News[]>( this.API_NEW);
  }

  getAllSiteMap(): Observable<News[]>{
    return this.http.get<News[]>( this.API_SITEMAP);
  }
}
