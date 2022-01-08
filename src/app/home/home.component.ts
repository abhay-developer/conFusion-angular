import { Component, OnInit,Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish!:Dish;
  promotion!:Promotion;
  leader!:Leader;
  dishErrMsg!:string;
  promotionErrMsg!:string;
  leaderErrMsg!:string;
  constructor(private dishService:DishService, private promotionService:PromotionService,private leaderService:LeaderService,@Inject("BaseURL") public BaseURL:string) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish().subscribe({next:dish=>this.dish=dish, error:errMsg=>this.dishErrMsg=errMsg});
    this.promotionService.getFeaturedPromotion().subscribe({next:promotion=>this.promotion=promotion,error:errMsg=>this.promotionErrMsg=errMsg});
    this.leaderService.getFeaturedLeader().subscribe({next:leader=>this.leader=leader,error:errMsg=>this.leaderErrMsg=errMsg});
  }

}
