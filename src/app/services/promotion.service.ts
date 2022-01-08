import { Injectable } from '@angular/core';
import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/BaseURL';
import { HttpClient } from '@angular/common/http';
import { ProcessHttpMsgService } from './process-http-msg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient,
    private processHttpMsg:ProcessHttpMsgService) { }

  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(`${baseURL}promotions`).pipe(catchError(this.processHttpMsg.handleError))
  }

  getPromotion(id:string):Observable<Promotion>{
    return this.http.get<Promotion>(`${baseURL}promotions/${id}`).pipe(catchError(this.processHttpMsg.handleError));
  }

  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get<Promotion[]>(`${baseURL}promotions?featured=true`).pipe(map(promotion=>promotion[0])).pipe(catchError(this.processHttpMsg.handleError));;
  }
}
