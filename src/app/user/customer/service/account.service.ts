import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../model/Account';
import {Error1} from '../model/error1';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API_URL = 'http://localhost:8080/account';
  private readonly API_URL1 = 'http://localhost:8080/editPassWord';
  constructor(private http: HttpClient) {}

  getAccountById(id: string): Observable<Account>{
    return this.http.get<Account>(`${this.API_URL}?${id}`);
  }

  updatePassword(passOld: string,passNew: string,id: number ): Observable<Error1> {
    return this.http.patch<Error1>(`${this.API_URL1}/${id}?passOld=${passOld}&newPass=${passNew}`,null);
  }
}
