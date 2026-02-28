import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { BasketPageComponent } from './pages/basket/basket-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Пора перекусить!',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'basket',
    component: BasketPageComponent,
    title: 'Мой заказ',
  },
];
