import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cart-service.service';
import { Dish } from '../../shared/interfaces/interfaces';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent implements OnInit {
  private router = inject(Router);
  state = inject(CartService);

  isShowAlert = false;
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

  clearCart() {
    this.state.clearCart();
    this.showAlert();
  }

  showAlert() {
    this.isShowAlert = !this.isShowAlert;
  }
}
