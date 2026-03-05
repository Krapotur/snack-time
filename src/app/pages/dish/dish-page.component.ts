import { Component, inject } from '@angular/core';
import { Dish } from '../../shared/interfaces/interfaces';
import { CartService } from '../../shared/services/cart-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-page',
  templateUrl: './dish-page.component.html',
  styleUrl: './dish-page.component.scss',
})
export class DishPageComponent {
  state = inject(CartService);
  private router = inject(Router);

  cartList = this.state.cartList;
  dish = this.state.dish;

  addDishInCart(dish: Dish) {
    this.state.addDish(dish);
  }

  removeDishInCart(dish: Dish) {
    this.state.removeDish(dish);
  }

  goHomePage() {
    void this.router.navigate(['/']);
  }

  goCartPage() {
    void this.router.navigate(['/cart']);
  }
}
