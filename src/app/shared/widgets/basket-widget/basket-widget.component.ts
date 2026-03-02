import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cartt-service.service';

@Component({
  selector: 'app-basket-widget',
  imports: [],
  templateUrl: './basket-widget.component.html',
  styleUrl: './basket-widget.component.scss',
})
export class BasketWidgetComponent {
  private router = inject(Router);
  state = inject(CartService);

  basketList = this.state.cartList; 
  
  getBasketList() {
    this.state.getTotalPriceCart();
  }

  goBasketPage() {
    void this.router.navigate(['/basket']);
    this.getBasketList()
  }
}
