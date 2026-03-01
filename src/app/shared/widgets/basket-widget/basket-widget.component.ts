import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BasketService } from '../../services/basket-service.service';

@Component({
  selector: 'app-basket-widget',
  imports: [],
  templateUrl: './basket-widget.component.html',
  styleUrl: './basket-widget.component.scss',
})
export class BasketWidgetComponent {
  private router = inject(Router);
  state = inject(BasketService);

  basketList = this.state.basketList; 
  
  getBasketList() {
    this.state.getTotalPriceBasket();
  }

  goBasketPage() {
    void this.router.navigate(['/basket']);
    this.getBasketList()
  }
}
