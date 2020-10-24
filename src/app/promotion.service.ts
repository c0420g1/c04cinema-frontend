import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../Promotion';
import {Customer} from './user/customer/model/Customer';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
};
const apiUrl = 'http://localhost:8080/promotion';


@Injectable({
    providedIn: 'root'
})
export class PromotionService {
private CustomerUrl = 'http://localhost:8080/customer';
    constructor(private httpClient: HttpClient) {
    }

    getAll(): Observable<Promotion[]> {
        return this.httpClient.get<Promotion[]>(apiUrl).pipe(
        );
    }

    getCustomerPoint(customerId): Observable<Customer> {
        return this.httpClient.get<Customer>(this.CustomerUrl + '/' + customerId);
    }
}
