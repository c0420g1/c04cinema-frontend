import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/Customer';
import {Account} from '../model/Account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly API_URL = 'http://localhost:8080/account';
  constructor(private http: HttpClient) {}

  getAccountById(id: string): Observable<Account>{
    return this.http.get<Account>(`${this.API_URL}?${id}`);
  }

  updatePassword(account: Account): Observable<Account> {
    return this.http.patch<Account>(`${this.API_URL}/${account.id}`, account);
  }
}
