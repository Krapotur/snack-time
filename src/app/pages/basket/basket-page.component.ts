import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BasketService } from '../../shared/services/basket-service.service';
import { Dish } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrl: './basket-page.component.scss',
  imports: [RouterLink],
})
export class BasketPageComponent implements OnInit {
  private router = inject(Router);
  state = inject(BasketService);

  basketList = this.state.basketList;

  ngOnInit() {}

  goHomePage() {
    void this.router.navigate(['/']);
  }

  getQuantityPositionInOrder(dish: Dish) {
    let quantity: number = dish.quantityInCart;

    for (let el of this.basketList()) {
      if (el.id == el.id) {
        quantity = dish.quantityInCart;
      }
    }

    return quantity;
  }

  addDishInBasket(dish: Dish) {
    this.state.addDish(dish);
  }

  removeDishInBasket(dish: Dish) {
    this.state.removeDish(dish);
  }
}
