import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../model/location';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly API_URL = 'http://localhost:8080/location';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Location[]>{
    return this.http.get<Location[]>(this.API_URL);
  }
}
