import { Injectable } from '@angular/core';
import { PROMOTIONS } from '../shared/promotions';
import { Promotion } from '../shared/promotion';
import { delay, Observable, of } from 'rxjs';
import { DISHES } from '../shared/dishes';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions():Observable<Promotion[]>{
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id:string):Observable<Promotion>{
    return of(DISHES.filter((promotion)=>promotion.id===id)[0]).pipe(delay(2000));
  }

  getFeaturedPromotion():Observable<Promotion>{
    return of(PROMOTIONS.filter(promotion=>promotion.featured)[0]).pipe(delay(2000));
  }
}
