import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RestaurantService } from '../../shared/services/api/restaurant.service';
import { Restaurant } from '../../shared/interfaces/interfaces';
import { ToastService } from '../../shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-restaurants-page',
  imports: [],
  templateUrl: './restaurants-page.component.html',
  styleUrl: './restaurants-page.component.scss'
})
export class RestaurantsPageComponent implements OnInit, OnDestroy {
  private restService = inject(RestaurantService);
  private toastService = inject(ToastService)

  restaurants: Restaurant[] = [];
  rSub: Subscription | null = null;

  ngOnInit() {
    this.getRestaurantById('69fb4877c75c4cd55c4fe130');
  }

  ngOnDestroy() {
    this.rSub?.unsubscribe();
  }

  getRestaurantById(id: string) {

    setTimeout(() => {
      this.rSub = this.restService.getRestaurants().subscribe({
        next: restaurants => {
          console.log('restaurant', restaurants)
          if (restaurants.length) this.restaurants = restaurants
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

}
