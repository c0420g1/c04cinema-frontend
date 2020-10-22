import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private API_URL = 'http://localhost:8080/account'
  constructor(private http: HttpClient) { }
  getAllAccount(): Observable<Account[]>{
    return this.http.get<Account[]>(this.API_URL);
  }
}
