import { Injectable, signal, WritableSignal } from '@angular/core';
import { Category, Dish } from '../interfaces/interfaces';
import { of } from 'rxjs';

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
      category: 'Горячее',
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
      category: 'Горячее',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '3',
      title: 'Манты',
      isActive: true,
      weight: '170',
      price: 450,
      imgSrc: 'manty',
      category: 'Горячее',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '4',
      title: 'Салат Цезарь',
      isActive: true,
      weight: '200',
      price: 390,
      imgSrc: 'salat',
      category: 'Салаты',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '5',
      title: 'Чизкейк Нью-Орк',
      isActive: true,
      weight: '100',
      price: 290,
      imgSrc: 'cheeze',
      category: 'Десерты',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '6',
      title: 'Шашлык баранина',
      isActive: true,
      weight: '200',
      price: 690,
      imgSrc: 'mangal',
      category: 'Мангал',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '7',
      title: 'Пицца Маргаритта',
      isActive: true,
      weight: '210',
      price: 540,
      imgSrc: 'pizza',
      category: 'Пицца',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '8',
      title: 'Плов',
      isActive: true,
      weight: '220',
      price: 360,
      imgSrc: 'plov',
      category: 'Горячее',
      discount: 0,
      quantityInCart: 0,
    },
    {
      id: '9',
      title: 'Сок Апельсиновый',
      isActive: true,
      weight: '0.5',
      price: 150,
      imgSrc: 'apelsin',
      category: 'Напитки',
      discount: 0,
      quantityInCart: 0,
    },
  ];

  categories: Category[] = [
    { id: '1', title: 'Горячее', isActive: true },
    { id: '2', title: 'Напитки', isActive: false },
    { id: '3', title: 'Салаты', isActive: false },
    { id: '4', title: 'Мангал', isActive: false },
    { id: '5', title: 'Десерты', isActive: false },
  ];

  cartList = signal<Dish[]>(this.dishes);
  categoriesList = signal<Category[]>(this.categories);

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
}
