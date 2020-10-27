import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Banner} from '../model/Banner';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private readonly API_URL_BANNER = 'http://localhost:8080/banner';
  constructor(private http: HttpClient) { }

  getAllBanner(): Observable<Banner[]>{
    return this.http.get<Banner[]>(this.API_URL_BANNER);
  }
  addNewBanner(banner: Banner): Observable<void>{
    return this.http.post<void>(this.API_URL_BANNER, banner);
  }
  updateBanner(id: number, banner: Banner): Observable<void>{
    return this.http.patch<void>(this.API_URL_BANNER + '/' + id, banner);
  }
}
