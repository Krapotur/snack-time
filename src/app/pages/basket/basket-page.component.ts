import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrl: './basket-page.component.scss',
  imports: [RouterLink],
})
export class BasketPageComponent implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    console.log('Basket page');
  }

  goHomePage() {
    void this.router.navigate(['/']);
  }
}
