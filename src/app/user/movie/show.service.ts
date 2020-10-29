import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Show } from 'src/app/model/Show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private readonly API_URL = 'http://localhost:8080/shows';
  constructor(private http: HttpClient) { }



  getAllShow(): Observable<Show[]>{
    return this.http.get<Show[]>(this.API_URL);
  }
}
