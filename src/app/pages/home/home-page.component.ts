import { Component, inject } from '@angular/core';
import { BasketWidgetComponent } from '../../shared/widgets/basket-widget/basket-widget.component';
import { BasketService } from '../../shared/services/basket-service.service';
import { Dish } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [BasketWidgetComponent],
})
export class HomePageComponent {
  state = inject(BasketService);

  basketList = this.state.basketList;

  addDishInBasket(dish: Dish) {
    this.state.addDish(dish);
  }

  removeDishInBasket(dish: Dish) {
    this.state.removeDish(dish);
  }

  quantityDishesInBasket(){
    let amount = 0;
    for(let dish of this.basketList()){
      amount += dish.quantityInCart;
    }
    return amount;
  }
}
