import { Component, inject, OnInit } from '@angular/core';
import { CartWidgetComponent } from '../../shared/widgets/cart-widget/cart-widget.component';
import { CartService } from '../../shared/services/cart-service.service';
import { Category, Dish } from '../../shared/interfaces/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [CartWidgetComponent],
})
export class HomePageComponent implements OnInit {
  state = inject(CartService);
  private router = inject(Router);

  cartList = this.state.cartList;
  categories = this.state.categoriesList;

  dishCard: any;

  categoryTitle = 'Горячее';

  ngOnInit() {}

  addDishInCart(dish: Dish) {
    this.state.addDish(dish);
  }

  removeDishInCart(dish: Dish) {
    this.state.removeDish(dish);
  }
  
  selectCategory(category: Category) {
    this.categoryTitle = category.title;
    this.state.filterDishesByCategory(category);
  }

  selectDish(dish: Dish) {
    this.state.selectDish(dish);
    void this.router.navigate(['/dish']);
  }
}
