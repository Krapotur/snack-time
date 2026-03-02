import { Injectable, signal } from '@angular/core';
import { Dish } from '../interfaces/interfaces';

const MAX_DISHES_IN_CART = 4;

@Injectable({ providedIn: 'root' })
export class CartService {
  dishes: Dish[] = [
    {
      id: '1',
      title: 'Шорпа',
      isActive: true,
      weight: '150',
      price: 420,
      imgSrc: 'lagman',
      discount: 12,
      quantityInCart: 0,
    },
    {
      id: '2',
      title: 'Каурма Лагман',
      isActive: true,
      weight: '220',
      price: 390,
      imgSrc: 'shorpa',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '3',
      title: 'Шорпа',
      isActive: true,
      weight: '150',
      price: 420,
      imgSrc: 'lagman',
      discount: 12,
      quantityInCart: 0,
    },
    {
      id: '4',
      title: 'Каурма Лагман',
      isActive: true,
      weight: '220',
      price: 390,
      imgSrc: 'shorpa',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '5',
      title: 'Шорпа',
      isActive: true,
      weight: '150',
      price: 420,
      imgSrc: 'lagman',
      discount: 12,
      quantityInCart: 0,
    },
    {
      id: '6',
      title: 'Каурма Лагман',
      isActive: true,
      weight: '220',
      price: 390,
      imgSrc: 'shorpa',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '7',
      title: 'Каурма Лагман',
      isActive: true,
      weight: '220',
      price: 390,
      imgSrc: 'shorpa',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '8',
      title: 'Каурма Лагман',
      isActive: true,
      weight: '220',
      price: 390,
      imgSrc: 'shorpa',
      discount: 0,
      quantityInCart: 0,
    },
  ];

  readonly _cartList = signal<Dish[]>(this.dishes);
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
          if (el.quantityInCart !== 0)
            el.quantityInCart -= 1;
        }
      }
    } else {
      this.cartList().filter(el => el.id !== dish.id);
    }
  }

  getDiscountPrice(dish: Dish) {
    let price;

    price = dish.price - dish.price * (dish.discount / 100);
    if(dish.quantityInCart > 0){
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
