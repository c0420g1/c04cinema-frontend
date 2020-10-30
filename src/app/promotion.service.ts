import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../Promotion';
import {Customer} from './user/customer/model/Customer';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
};


@Injectable({
    providedIn: 'root'
})
export class PromotionService {
    private CustomerUrl = 'http://localhost:8080/customer';
    private updatePointPCUrl = 'http://localhost:8080/updatePointPC';
    private apiUrl = 'http://localhost:8080/promotion';
    private updateCodePcUrl = 'http://localhost:8080/createProCus';

    constructor(private httpClient: HttpClient) {
    }

    getAll(): Observable<Promotion[]> {
        return this.httpClient.get<Promotion[]>(this.apiUrl).pipe(
        );
    }

    getCustomerPoint(customerId): Observable<Customer> {
        return this.httpClient.get<Customer>(this.CustomerUrl + '?' + customerId);
    }

    updatePoint(customerId, point): Observable<void> {
        // @ts-ignore
        return this.httpClient.patch(this.updatePointPCUrl + '?id=' + customerId + '&point=' + point);
    }

    getRandomCode(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    updateCodePC(customerId, promotionId, code): Observable<void> {
        // @ts-ignore
        return this.httpClient.post(this.updateCodePcUrl + '?cusId=' + customerId + '&proId=' + promotionId + '&code=' + code);

    }

}
