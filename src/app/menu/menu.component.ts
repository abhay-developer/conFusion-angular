import { Component, OnInit,Inject } from '@angular/core';
import { DishService } from '../services/dish.service';
import { Dish } from '../shared/dish';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes!:Dish[];
  errMsg!:string;
  constructor(private dishService:DishService,@Inject('BaseURL') public BaseURL:string) { }

  ngOnInit(): void {
    this.getDishes();
  }

  getDishes():void{
    this.dishService.getDishes().subscribe({next:dishes=>this.dishes=dishes,
      error:errMsg=>this.errMsg=errMsg});
  }
}
