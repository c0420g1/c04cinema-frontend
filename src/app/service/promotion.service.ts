import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Promotion} from '../model/promotion';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private readonly API_URL_PROMOTION = 'http://localhost:8080/promotion';
  constructor(private http: HttpClient) { }

  getAllPromotion(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(this.API_URL_PROMOTION);
  }
  addNewPromotion(promotion: Promotion): Observable<void>{
    return this.http.post<void>(this.API_URL_PROMOTION, promotion);
  }
  updatePromotion(id: number, promotion: Promotion): Observable<void>{
    return this.http.patch<void>(this.API_URL_PROMOTION + '/' + id, promotion);
  }
}
