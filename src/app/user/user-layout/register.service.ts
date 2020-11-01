import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Account} from '../customer/model/Account';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private API_URL_AC = 'http://localhost:8080/accountIdFirst'
  private API_URL_CUS = 'http://localhost:8080/customerIdFirst'
  private API_URL_ADD_ACCOUNT = 'http://localhost:8080/account'
  private API_URL_ADD_CUSTOMER = 'http://localhost:8080/customer'
  private API_URL_ROLE = 'http://localhost:8080/role_account'
  private API_URL_CHECK_ACCOUNT = 'http://localhost:8080/checkAccount'
  private API_URL_CHECK_EMAIL = 'http://localhost:8080/checkEmail'
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
  addRole(role): Observable<any>{
    return this.http.post(this.API_URL_ROLE, role);
  }
  checkAccount(account): Observable<any>{
    return this.http.post(this.API_URL_CHECK_ACCOUNT, account);
  }
  chekEmail(email: string): Observable<any>{
    return this.http.post(this.API_URL_CHECK_EMAIL, email);
  }
}
