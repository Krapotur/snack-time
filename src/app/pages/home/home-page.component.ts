import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartWidgetComponent } from '../../shared/widgets/cart-widget/cart-widget.component';
import { CartService } from '../../shared/services/cart-service.service';
import { Category, Dish, Restaurant } from '../../shared/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';
import { CategoryService } from '../../shared/services/api/category.service';
import { environment } from '../../environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  imports: [CartWidgetComponent],
})
export class HomePageComponent implements OnInit, OnDestroy {
  state = inject(CartService);
  private route = inject(ActivatedRoute)
  private categoryService = inject(CategoryService)
  private router = inject(Router);
  private toastService = inject(ToastService)

  restaurantID = environment.restaurantID;
  categories: Category[] = [];
  restaurant: Restaurant | null = null;

  cartList = this.state.cartList;

  dishCard: any;

  categoryTitle = 'Горячее';

  cSub: Subscription | null = null;

  ngOnInit() {
    console.log(this.restaurantID)
    if (this.restaurantID) {
      this.getCategories(this.restaurantID);
    }
  }

  ngOnDestroy() {
    this.cSub?.unsubscribe();
  }

  getCategories(id: string) {
    setTimeout(() => {
      this.cSub = this.categoryService.getCategoriesByRestaurantID(id).subscribe({
        next: categories => {
          console.log('categories', categories)
          if (categories) this.categories = categories
        },
        error: error => {
          if (error.status === 401) {
            this.toastService.show('Для получения данных, требуется авторизация!')
          } else {
            this.toastService.show(error.error.message)
          }
        }
      }
      )
    }, 300)
  }

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
