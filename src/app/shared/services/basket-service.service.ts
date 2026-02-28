import { Injectable, signal } from '@angular/core';
import { Dish } from '../interfaces/interfaces';

@Injectable({ providedIn: 'root' })
export class BasketService {
  dishes: Dish[] = [
    { title: 'Шорпа', isActive: true },
    { title: 'Каурма Лагман', isActive: true }
];

  private readonly _basketList = signal<Dish[]>([]);
  readonly basketList = this._basketList.asReadonly(); 

  getBasketBasketList(){
    console.log(this.dishes);
  }  

  increment() {
    // this._count.update((v) => v + 1);
  }
}
