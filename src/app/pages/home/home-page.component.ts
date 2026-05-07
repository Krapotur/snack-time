import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartWidgetComponent } from '../../shared/widgets/cart-widget/cart-widget.component';
import { CartService } from '../../shared/services/cart-service.service';
import { Category, Dish, Kitchen, Restaurant } from '../../shared/interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';
import { CategoryService } from '../../shared/services/api/category.service';
import { environment } from '../../environment';
import { RestaurantService } from '../../shared/services/api/restaurant.service';
import { KitchenService } from '../../shared/services/api/kitchen.service';

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
  private restService = inject(RestaurantService)
  private kitchenService = inject(KitchenService)
  private router = inject(Router);
  private toastService = inject(ToastService)

  restaurantID = environment.restaurantID;
  kitchenID = '';
  categories: Category[] = [];
  restaurant: Restaurant | null = null;
  kitchenTitle = '';

  cartList = this.state.cartList;

  dishCard: any;

  categoryTitle = 'Горячее';

  cSub: Subscription | null = null;
  rSub: Subscription | null = null;
  kSub: Subscription | null = null;

  ngOnInit() {
    if (this.restaurantID) {
      this.getRestaurantByID(this.restaurantID);
      this.getCategories(this.restaurantID);
    }
  }

  ngOnDestroy() {
    this.cSub?.unsubscribe();
    this.rSub?.unsubscribe();
    this.kSub?.unsubscribe();
  }

  getCategories(id: string) {
    setTimeout(() => {
      this.cSub = this.categoryService.getCategoriesByRestaurantID(id).subscribe({
        next: categories => {
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

  getRestaurantByID(id: string) {
    setTimeout(() => {
      this.cSub = this.restService.getRestaurantByID(id).subscribe({
        next: r => {
          if (r) {
            this.restaurant = r;
            this.getKitchenByID(r.kitchen)
          }
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

  getKitchenByID(id: string) {
    setTimeout(() => {
      this.kSub = this.kitchenService.getKitchenByID(id).subscribe({
        next: k => {
          if (k) this.kitchenTitle = k.title
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
