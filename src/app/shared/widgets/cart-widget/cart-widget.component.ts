import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart-service.service';

@Component({
  selector: 'app-cart-widget',
  templateUrl: './cart-widget.component.html',
  styleUrl: './cart-widget.component.scss',
})
export class CartWidgetComponent {
  private router = inject(Router);
  state = inject(CartService);

  basketList = this.state.cartList; 
  
  getCartList() {
    this.state.getTotalPriceCart();
  }

  goCartPage() {
    void this.router.navigate(['/cart']);
    this.getCartList()
  }
}
