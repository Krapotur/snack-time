import { Injectable, signal } from '@angular/core';
import { Dish } from '../interfaces/interfaces';

const MAX_DISHES_IN_CART = 4;

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly _cartList = signal<Dish[]>([]);
  readonly cartList = this._cartList.asReadonly();

  getTotalPriceCart() {
    let amount = 0;
    for (let dish of this.cartList()) {
      amount += this.getDiscountPrice(dish) * dish.quantityInCart;
    }
    return amount;
  }

  addDish(dish: Dish) {
    if (this.cartList().includes(dish)) {
      for (let el of this.cartList()) {
        if (el.id === dish.id && el.quantityInCart <= MAX_DISHES_IN_CART) {
          el.quantityInCart += 1;
        }
      }
    } else {
      this.cartList().push(dish);
    }
  }

  removeDish(dish: Dish) {
    if (this.cartList().includes(dish)) {
      for (let el of this.cartList()) {
        if (el.id === dish.id) {
          if (el.quantityInCart !== 0) el.quantityInCart -= 1;
        }
      }
    } else {
      this.cartList().filter((el) => el.id !== dish.id);
    }
  }

  clearCart() {
    this.cartList().length = 0;
  }

  getDiscountPrice(dish: Dish) {
    let price;

    price = dish.price - dish.price * (dish.discount / 100);
    if (dish.quantityInCart > 0) {
      price *= dish.quantityInCart;
    }
    return Math.round(price);
  }

  getQuantityDishesInCart() {
    let quantityDishes = 0;
    for (let dish of this.cartList()) {
      quantityDishes += dish.quantityInCart;
    }

    return quantityDishes;
  }
}
