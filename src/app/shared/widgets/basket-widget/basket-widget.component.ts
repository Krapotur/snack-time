import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket-widget',
  imports: [],
  templateUrl: './basket-widget.component.html',
  styleUrl: './basket-widget.component.scss',
})
export class BasketWidgetComponent{
  private router = inject(Router);
  
  goBasketPage() {
    void this.router.navigate(['/basket']);
  }
}
