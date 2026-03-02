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
