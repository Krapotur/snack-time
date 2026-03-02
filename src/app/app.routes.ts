import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home/home-page.component';
import { CartPageComponent } from './pages/cart/cart-page.component';

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
    path: 'cart',
    component: CartPageComponent,
    title: 'Мой заказ',
  },
];
