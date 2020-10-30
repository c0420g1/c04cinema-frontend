import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from './model/account';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private API_URL_AC = 'http://localhost:8080/accountIdFirst'
  private API_URL_CUS = 'http://localhost:8080/customerIdFirst'
  private API_URL_ADD_ACCOUNT = 'http://localhost:8080/account'
  private API_URL_ADD_CUSTOMER = 'http://localhost:8080/customer'
  constructor(private http: HttpClient) { }
  getAccountIdFirst(): Observable<Account>{
    return this.http.get<Account>(this.API_URL_AC);
  }
  addAccount(account): Observable<Account>{
    return this.http.post<Account>(this.API_URL_ADD_ACCOUNT, account);
  }
  addCustomer(customer): Observable<any>{
    return this.http.post(this.API_URL_ADD_CUSTOMER, customer);
  }
  getCustomerIdFirst(): Observable<Account>{
    return this.http.get<Account>(this.API_URL_CUS);
  }
}
