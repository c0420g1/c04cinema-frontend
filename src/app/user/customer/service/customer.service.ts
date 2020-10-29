import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/Customer';
import { Error1 } from '../model/error1';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private readonly API_URL = 'http://localhost:8080/customer';
  private readonly API_URL1 = 'http://localhost:8080/editCustomer';
  constructor(private http: HttpClient) {}

  getCustomerById(id: string): Observable<Customer>{
    return this.http.get<Customer>(`${this.API_URL}?${id}`);
  }

  updateCustomer(customer: Customer, i: number): Observable<Error1[]> {
    return this.http.patch<Error1[]>(`${this.API_URL1}/${customer.id}`, customer);
  }
}
