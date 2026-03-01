import { Injectable, signal } from '@angular/core';
import { Dish } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class BasketService {
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
  ];

  readonly _basketList = signal<Dish[]>(this.dishes);
  readonly basketList = this._basketList.asReadonly();

  getTotalPriceBasket() {
    let amount = 0;
    for (let dish of this.basketList()) {
      amount += this.getDiscountPrice(dish) * dish.quantityInCart;
    }
    return amount;
  }

  addDish(dish: Dish) {
    if (this.basketList().includes(dish)) {
      for (let el of this.basketList()) {
        if (el.id == dish.id) {
          el.quantityInCart += 1;
        }
      }
    } else {
      this.basketList().push(dish);
    }
  }

  removeDish(dish: Dish) {
    if (this.basketList().includes(dish)) {
      for (let el of this.basketList()) {
        if (el.id == dish.id) {
          if(el.quantityInCart != 0)
          el.quantityInCart -= 1;
        }
      }
    } else {
      this.basketList().filter(el => el.id != dish.id);
    }
  }

   getDiscountPrice(dish: Dish) {
    let price;

    price = dish.price - dish.price * (dish.discount / 100);

    return Math.round(price);
  }
}
