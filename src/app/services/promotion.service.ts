import { Injectable } from '@angular/core';
import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { DISHES } from '../shared/dishes';
import { baseURL } from '../shared/BaseURL';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(private http:HttpClient) { }

  getPromotions():Observable<Promotion[]>{
    return this.http.get<Promotion[]>(`${baseURL}promotions`);
  }

  getPromotion(id:string):Observable<Promotion>{
    return this.http.get<Promotion>(`${baseURL}promotions/${id}`);
  }

  getFeaturedPromotion():Observable<Promotion>{
    return this.http.get<Promotion[]>(`${baseURL}promotions?featured=true`).pipe(map(promotion=>promotion[0]));
  }
}
