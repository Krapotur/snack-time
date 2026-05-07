import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Category, Dish } from '../interfaces/interfaces';
import { of } from 'rxjs';
import { ToastService } from './toast.service';

const MAX_DISHES_IN_CART = 4;

@Injectable({ providedIn: 'root' })
export class CartService {
  toastService = inject(ToastService);

  dishes: Dish[] = [];
  categoies: Category[] = []

  cartList = signal<Dish[]>(this.dishes);
  // categoriesList = signal<Category[]>(this.categories);

  dish: any;

  setCategories(categories: Category[]){
    this.categoies = categories
  }

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
        if (el.id === dish.id && el.quantityInCart == MAX_DISHES_IN_CART) {
          this.toastService.show('Превышен лимит на количество блюд');
        }
        if (el.id === dish.id && el.quantityInCart <= MAX_DISHES_IN_CART) {
          el.quantityInCart += 1;
        }
      }
    } else {
      dish.quantityInCart += 1;
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
    this.cartList().forEach((dish) => (dish.quantityInCart = 0));
  }

  getDiscountPrice(dish: Dish) {
    let price;

    price = dish.price - dish.price * (dish.discount / 100);
    return Math.round(price);
  }

  getQuantityDishesInCart() {
    let quantityDishes = 0;
    for (let dish of this.cartList()) {
      quantityDishes += dish.quantityInCart;
    }

    return quantityDishes;
  }

  filterDishesByCategory(category: Category) {
    let filteredList = [];
    for (let dish of this.dishes) {
      if (dish.category === category.title) {
        filteredList.push(dish);
      }
    }

    this.cartList.set(filteredList);
  }

  selectDish(dish: Dish) {
    this.dish = dish;
    console.log(this.dish);
  }
}
