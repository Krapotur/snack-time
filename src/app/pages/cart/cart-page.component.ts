import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cartt-service.service';
import { Dish } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
  imports: [RouterLink],
})
export class CartPageComponent implements OnInit {
  private router = inject(Router);
  state = inject(CartService);

  cartList = this.state.cartList;

  ngOnInit() {}

  goHomePage() {
    void this.router.navigate(['/']);
  }

  getQuantityPositionInOrder(dish: Dish) {
    let quantity: number = dish.quantityInCart;

    for (let el of this.cartList()) {
      if (el.id == el.id) {
        quantity = dish.quantityInCart;
      }
    }

    return quantity;
  }

  addDishInCart(dish: Dish) {
    this.state.addDish(dish);
  }

  removeDishInCart(dish: Dish) {
    this.state.removeDish(dish);
  }
}
