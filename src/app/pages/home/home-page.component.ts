import { Component, inject, OnInit } from '@angular/core';
import { CartWidgetComponent } from '../../shared/widgets/cart-widget/cart-widget.component';
import { CartService } from '../../shared/services/cart-service.service';
import { Dish } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [CartWidgetComponent],
})
export class HomePageComponent implements OnInit {
  state = inject(CartService);
  cartList = this.state.cartList;
  categories = this.state.categoriesList;

  ngOnInit() {}

  addDishInCart(dish: Dish) {
    this.state.addDish(dish);
  }

  removeDishInCart(dish: Dish) {
    this.state.removeDish(dish);
  }

  quantityDishesInCart() {
    let amount = 0;
    for (let dish of this.cartList()) {
      amount += dish.quantityInCart;
    }
    return amount;
  }
}
